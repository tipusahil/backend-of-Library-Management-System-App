import {  Router } from "express";
import { bookController } from "./book.controller";

const bookRouter: Router = Router();

bookRouter.post("/",bookController.createBook);
bookRouter.get("/",bookController.getAllBooks);
// bookRouter.patch("/",bookController.getAllBooks);
// bookRouter.put("/",bookController.getAllBooks);
// bookRouter.delete("/",bookController.getAllBooks);

export default bookRouter;
