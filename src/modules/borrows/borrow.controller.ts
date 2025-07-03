import { NextFunction, Request, Response } from "express";
import BorrowModel from "./borrow.model";
import { returnBook } from "./returnBook";
import BookModel from "../books/book.model";
// import BorrowModel from "./borrow.model";

// ---borrow post-1
const createBorrow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {book, quantity} = req.body;

const Onebook = await BookModel.findById(book);
    if(!Onebook){throw new Error("this book not found for borrow!🫗")};

    if(Onebook.copies < quantity){throw new Error("Not enough copies available")}

    Onebook.copies -= quantity;
    Onebook.updateBookAvailability(); // custom instance method: set available = false if copies === 0

  await  Onebook.save();

    const data = await BorrowModel.create(req.body);

    res.status(200).send({
      success: true,
      message: "borrow created successfully✅",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
// ----------------------
// --get all borrows -2
const getAllBorrows = async (req: Request, res: Response, next: NextFunction) => {

  try {
    // ----------------------query steps start here ------------
    // --- STEP 1: Query params
    const genreX = req.query.filter as string; // genre key er value diye filter hobe like FANTASY
    const sortByCreatedTime = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) === "asc" ? 1 : -1; // asc or desc
    const limitX = parseInt(req.query.limit as string) || 10;

    // --- STEP 2: Build Mongoose filter object
    const filterX: any = {};
    if (genreX) {
      filterX.genre = genreX.toUpperCase(); // filterX.genre = genre (key)
    }

    // --- STEP 3: query database
    const allborrows = await BorrowModel.find(filterX)
    .sort({[sortByCreatedTime] : sortOrder}) // dynamic sorting
    .limit(limitX).populate("book");
    // .limit(limitX);
    // ----------------------query steps end here ------------

    res.status(200).json({
      success: true,
      message: "All borrows retrieved successfully✅",
      "Total borrows": allborrows.length,
      data: allborrows,
    });
  } catch (error) {
    next(error);
  }
};
// ----------------------

// --get single  borrow-3

const getSingleBorrow = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const borrowId = req.params.borrowId;
    const data = await BorrowModel.findById(borrowId).populate("book");
    res.status(200).send({
      success: true,
      message: data == null ? "This borrow's  might have been deleted!🤔" : "sinlge borrow retrieved successfully✅",// jodi ei id wala  borrow ta na thake tokon jate null na diye ei msg ta dei.
      data: data == null ? "empty this id's data🫗" : data
    });
  } catch (error) {
    next(error);
  }
};

// --update borrow-4

const updateBorrow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowId = req.params.borrowId;

    const dataForUpdate = req.body;

    const data = await BorrowModel.findByIdAndUpdate(borrowId, dataForUpdate, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      success: true,
      message: "borrow updated successfully✅",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

// --replace borrow-5

const replaceBorrow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowId = req.params.borrowId;

    const dataForReplace =  req.body;// req.body syncronous kaj kore. so await lagbnea, id er moto

    const data = await BorrowModel.findOneAndReplace(
      { _id: borrowId },
      dataForReplace,
      { new: true, runValidators: true }
    );
    res.status(200).send({
      success: true,
      message: "borrow replaced successfully✅",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

// --delete borrow-6

const deleteBorrow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const borrowId = req.params.borrowId;
// ---------borrow delete kore dile jate jei book borrow korsilo segulo jate aber restore hoye jai oi book er copies er modde
    const borrow = await BorrowModel.findById(borrowId);
if(!borrow){throw new Error("borrow not found for delete")};

    const book = await BookModel.findById(borrow.book);

    if(!book){throw new Error("this book not found")};
    book.copies += borrow.quantity;
   await  book.save();
// --------------
    const data = await BorrowModel.findByIdAndDelete(borrowId);
    res.status(200).send({
      success: true,
      message: "borrow deleted successfully✅",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};


// ----return book-7

const returnBooksController = async (req :Request,res:Response,next : NextFunction)=>{
  try {
    const borrowId = req.params.borrowId;

await returnBook(borrowId);

    res.status(200).send({
      success: true,
      message: "Book returned successfully✅",
    //   quantity : borrowBook?.quantity,
    });
  } catch (error) {
    next(error);
  }
}



export const borrowController = {
  createBorrow,
  getAllBorrows,
  getSingleBorrow,
  updateBorrow,
  replaceBorrow,
  deleteBorrow,
  returnBooksController
};
