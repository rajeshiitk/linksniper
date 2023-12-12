import { NextFunction, Request, Response } from "express";
import requestIp from "request-ip";

// inside middleware handler
export const ipMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  requestIp.getClientIp(req);
  next();
};
