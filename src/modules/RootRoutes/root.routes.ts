import { Router } from "express";
import bookRouter from "../books/book.route";
import BorrowRouter from "../borrows/borrow.route";


const RootRoutes : Router = Router();

RootRoutes.use("/api/books",bookRouter);
RootRoutes.use("/api/borrow",BorrowRouter);

export default RootRoutes;