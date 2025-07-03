import { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";
import BookModel from "../books/book.model";
import { timeStamp } from "console";

const borrowSchema = new Schema<IBorrow>({
  quantity: { type: Number,
    min:[1,"atleast one book borrow"]
   },
  dueDate: { type: Date,
    default:Date.now,
   },
     book: { type: Schema.Types.ObjectId,
    ref: "BookModel_insideModel",
    required:true,
    
  },
},
{
    versionKey:false,
    timestamps : true,
}

);

// -------------------------------------pre and after middleware start here--------

borrowSchema.pre("save",async function(next){


    const onebBookData = await BookModel.findById(this.book);

    if(!onebBookData){
        return next(new Error("Book not found!"));
    }
    if(!onebBookData.available){
        return next(new Error("Book is not available for borrowing"));
    }

    if(onebBookData.copies < this.quantity) {
          return next(new Error("Not enough copies available"));
    };



  onebBookData.copies -= this.quantity; // borrow kora hocce, tai copy komano hocce.

  if(onebBookData.copies <= 0) {
onebBookData.available = false;
  }

  await onebBookData.save();// book updated kora hoise.

  next();
})

// -------------------------------------pre and after middleware end here--------



// ----borrow model ---
 
const BorrowModel = model("BorrowModel_insideModel",borrowSchema,"borrowCollection1_of_library-database");

export default BorrowModel;