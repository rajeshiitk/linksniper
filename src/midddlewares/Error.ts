import httpStatus from "http-status";
import { Response, Request } from "express";

export const ErrorHandler = (err: any, req: Request, res: Response) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(statusCode).send({
    code: statusCode,
    message: err.message,
    stack: err.stack,
  });
};
