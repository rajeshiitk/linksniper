import { NextFunction, Request, Response } from "express";

export const catchAsyncError =
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | any
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
