import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: {
        name: err.name,
        errors: err.errors,
      },
    });
    return;
  }

  // fallback error
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: {
      name: err.name,
      message: err.message,
    },
  });
};

export default globalErrorHandler;
