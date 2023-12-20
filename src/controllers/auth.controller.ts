import httpStatus from "http-status";
import authService from "../services/auth.service";
import { catchAsyncError } from "../utils/CatchAsyncError";
import { Request, Response } from "express";

class authController {
  static signUpUser = catchAsyncError(async (req: Request, res: Response) => {
    // TODO: fix issue with avator upload and save
    const resObj = await authService.signUpUser(req?.body);
    return res.status(httpStatus.CREATED).send(resObj);
  });
}

export default authController;
