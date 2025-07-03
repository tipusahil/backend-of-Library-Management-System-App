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

// --get all books -2
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBooks = await BookModel.find();

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully✅",
      "total books": allBooks.length,
      data: allBooks,
    });
  } catch (error) {
    next(error);
  }
};

// --update book-3

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;

    const dataForUpdate = await req.body;

    const data = await BookModel.findById(bookId, dataForUpdate);
    res.status(200).send({
      success: true,
      message: "Book updated successfully✅",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const bookController = { createBook, getAllBooks };
