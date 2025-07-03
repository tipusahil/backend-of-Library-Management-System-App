import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
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
