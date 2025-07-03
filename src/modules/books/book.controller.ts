import { NextFunction, Request, Response } from "express";
import BookModel from "./book.model";

// ---book post-1
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookData = req.body;

    const data = await BookModel.create(bookData);

    res.status(200).send({
      success: true,
      message: "Book created successfully✅",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
// ----------------------
// --get all books -2
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {

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
    const allBooks = await BookModel.find(filterX)
    .sort({[sortByCreatedTime] : sortOrder}) // dynamic sorting
    .limit(limitX);
    // ----------------------query steps end here ------------

    res.status(200).json({
      success: true,
      message: "All Books retrieved successfully✅",
      "Total Books": allBooks.length,
      data: allBooks,
    });
  } catch (error) {
    next(error);
  }
};
// ----------------------

// --get single  book-3

const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const data = await BookModel.findById(bookId)
    res.status(200).send({
      success: true,
      message: data == null ? "This book might have been deleted!🤔" : "sinlge Book retrieved successfully✅",// jodi ei id wala  book ta na thake tokon jate null na diye ei msg ta dei.
      data:  data == null ? "empty this id's data🫗" : data
    });
  } catch (error) {
    next(error);
  }
};

// --update book-4

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;

    const dataForUpdate =  req.body; // req.body sync run hoi so , await lagbena.niser line e lagbe j,or db theek data anar ketre await lagbe.

    const data = await BookModel.findByIdAndUpdate(bookId, dataForUpdate, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      success: true,
      message: "Book updated successfully✅",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

// --replace book-5

const replaceBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;

    const dataForReplace =  req.body;// req.body sync run hoi so , await lagbena.niser line e lagbe j,or db theek data anar ketre await lagbe.

    const data = await BookModel.findOneAndReplace(
      { _id: bookId },
      dataForReplace,
      { new: true, runValidators: true }
    );
    res.status(200).send({
      success: true,
      message: "Book replaced successfully✅",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

// --delete book-6

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;

    const data = await BookModel.findByIdAndDelete(bookId);
    res.status(200).send({
      success: true,
      message: "Book deleted successfully✅",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const bookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  replaceBook,
  deleteBook,
};
