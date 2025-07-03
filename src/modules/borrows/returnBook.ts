import BookModel from "../books/book.model";
import BorrowModel from "./borrow.model";

export const returnBook = async (borrowId: string): Promise<void> => {
  const borrow = await BorrowModel.findById(borrowId);
  if (!borrow) throw new Error("Borrow record not found");

  const book = await BookModel.findById(borrow.book);
  if (!book) throw new Error("Book not found");

  book.copies += borrow.quantity;

  if (book.copies > 0) {
    book.available = true;
  }

  await book.save();
  await BorrowModel.findByIdAndDelete(borrowId); // পুরনো borrow রেকর্ড মুছে ফেলছি
};
