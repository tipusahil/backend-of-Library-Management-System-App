import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    uppercase: true,
    default: "FICTION",
    enum: {
      values: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      message: "{VALUE} not suported here",
    },
  },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: {
    type: Number,
    required: true,
    min: [0, "Copies can't be negative"],
    validate: {
      validator: Number.isInteger,
      message: "Copies must be an integer",
    },
  },
  available: { type: Boolean, default: true },
},
{
    versionKey:false,
    timestamps:true,
}
);

const BookModel = model<IBook>(
  "BookModel",
  bookSchema,
  "booksCollection1_of_library-database"
);

export default BookModel;