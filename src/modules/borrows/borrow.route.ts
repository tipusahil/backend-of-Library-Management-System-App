import {  Router } from "express";
import { borrowController } from "./borrow.controller";


const BorrowRouter: Router = Router();

BorrowRouter.post("/",borrowController.createBorrow);
BorrowRouter.get("/",borrowController.getAllBorrows);
BorrowRouter.get("/summary",borrowController.getBorrowSummeryByAggregatePipline);// static route first  e likte hobe.
BorrowRouter.get("/:borrowId",borrowController.getSingleBorrow);// dynamic route static route er pore define korte hob,e nahoi static route k dynamic vebe oi summary k id hisebe treat korbe,tkn error dibe.
BorrowRouter.patch("/:borrowId",borrowController.updateBorrow);
BorrowRouter.put("/:borrowId",borrowController.replaceBorrow);
BorrowRouter.delete("/:borrowId",borrowController.deleteBorrow);
BorrowRouter.post("/:borrowId",borrowController.returnBooksController);



export default BorrowRouter;
