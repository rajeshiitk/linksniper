import httpStatus from "http-status";
import authService from "../services/auth.service";
import { catchAsyncError } from "../utils/CatchAsyncError";
import { Request, Response } from "express";

class authController {
  static signUpUser = catchAsyncError(async (req: Request, res: Response) => {
    // TODO: fix issue with avator upload and save
    const resObj = await authService.signUpUser(req?.body, req?.file);
    return res.status(httpStatus.CREATED).send(resObj);
  });
  static loginUser = catchAsyncError(async (req: Request, res: Response) => {
    // TODO: fix issue with avator upload and save
    const resObj = await authService.loginUser(req?.body);
    return res.status(httpStatus.OK).send(resObj);
  });

  static profile = catchAsyncError(async (req: Request, res: Response) => {
    // @ts-expect-error  Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
    const userId = req?.user;
    const resObj = await authService.profile(userId);
    return res.status(httpStatus.OK).send(resObj);
  });

  static updateUser = catchAsyncError(async (req: Request, res: Response) => {
    // @ts-expect-error  Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
    const userId = req?.user;
    const resObj = await authService.updateUser(userId, req?.body, req?.file);
    return res.status(httpStatus.OK).send(resObj);
  });

  static forgotPassword = catchAsyncError(
    async (req: Request, res: Response) => {
      const resObj = await authService.forgotPassword(req?.body);
      return res.status(httpStatus.OK).send(resObj);
    }
  );

  static updatePassword = catchAsyncError(
    async (req: Request, res: Response) => {
      const resObj = await authService.updatePassword(req?.body);
      return res.status(httpStatus.OK).send(resObj);
    }
  );
}

export default authController;

// async (req: Request, res: Response) => {
//   const mailService = MailService.getInstance();

//   const to = "rtsphysics.18@gmail.com";
//   const subject = "Password Reset ✔";
//   // const text = "Hello world?";
//   const html =   `
//   <h1>Forget Password</h1>
//   hey ,Rajesh
//   <a href="http://localhost:500/update-password?token=${token}">click here to update your password</a>

// `

// , // html body;

//   const resObj = await mailService.sendMail(
//    to,subject,html
//   );
//   return res.status(httpStatus.OK).send(resObj);
// }
