import { Router } from "express";
import bookRouter from "../books/book.route";


const RootRoutes : Router = Router();

RootRoutes.use("/api/books",bookRouter);

export default RootRoutes;