import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";
import { NextFunction } from "express";

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


// -------------------------------------pre and after middleware start here--------
// ----1
bookSchema.pre("save",async function(next) {

if(this.copies == 0){
  this.available = false
} 
else {this.available= true};

next();
})
// -----2
bookSchema.pre("findOneAndUpdate",async function (next){
const updateData = this.getUpdate() as any;
if(updateData?.copies !== undefined){
updateData.available = updateData.copies == 0 ? false : true;

this.setUpdate(updateData);
}
next()
})


// ------3 custom method 
bookSchema.method("updateBookAvailability",async function(){
  this.available = this.copies >0;// copies er value jodi 0theke boro hoi thle true boshbe, nahoi false bosbe
})
// -------------------------------------pre and after middleware end here--------




// ----book model-----
const BookModel = model<IBook>(
  "BookModel_insideModel",
  bookSchema,
  "booksCollection1_of_library-database"
);

export default BookModel;