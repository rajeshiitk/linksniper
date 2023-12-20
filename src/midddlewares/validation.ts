import { validationResult } from "express-validator";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";

export const validationError = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array().map((err) => err.msg);
    console.log(error);
    // throw new ApiError(httpStatus.BAD_REQUEST, error);
    next(new ApiError(httpStatus.BAD_REQUEST, error[0])); // used next() instead of throw new ApiError() because we want to use the global error handler
    return;
  }
  next();
};
