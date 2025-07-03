import {  Router } from "express";
import { borrowController } from "./borrow.controller";


const BorrowRouter: Router = Router();

BorrowRouter.post("/",borrowController.createBorrow);
BorrowRouter.get("/",borrowController.getAllBorrows);
BorrowRouter.get("/:borrowId",borrowController.getSingleBorrow);
BorrowRouter.patch("/:borrowId",borrowController.updateBorrow);
BorrowRouter.put("/:borrowId",borrowController.replaceBorrow);
BorrowRouter.delete("/:borrowId",borrowController.deleteBorrow);
BorrowRouter.post("/:borrowId",borrowController.returnBooksController);

export default BorrowRouter;
