import {  Router } from "express";
import { bookController } from "./book.controller";

const bookRouter: Router = Router();

bookRouter.post("/",bookController.createBook);
bookRouter.get("/",bookController.getAllBooks);
bookRouter.get("/:bookId",bookController.getSingleBook);
bookRouter.patch("/:bookId",bookController.updateBook);
bookRouter.put("/:bookId",bookController.replaceBook);
bookRouter.delete("/:bookId",bookController.deleteBook);

export default bookRouter;
