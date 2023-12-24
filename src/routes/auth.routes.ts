import { NextFunction, Request, Response, Router } from "express";
import authController from "../controllers/auth.controller";
import { upload } from "../utils/multer";
import { authValidation } from "../validations/auth.validation";
// import { validationError } from "../midddlewares/validation";
import { verifyToken } from "../midddlewares/verifyToken";

const authRoute = Router();

authRoute.route("/sign-up").post(
  upload.single("image"),
  authValidation.signUpUser, // this middleware will validate the request body
  //   validationError, // this middleware will check for any validation errors and throw an error if any

  authController.signUpUser
);

authRoute.route("/login").post(
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    next();
  },
  authValidation.loginUser,
  authController.loginUser
);

authRoute
  .route("/profile")
  .get(verifyToken, authController.profile)
  .put(
    verifyToken,
    authValidation.updateUser,
    upload.single("image"),
    authController.updateUser
  );

authRoute
  .route("/forgot-password")
  .post(authValidation.forgotPassword, authController.forgotPassword);

authRoute
  .route("/update-password")
  .put(authValidation.updatePassword, authController.updatePassword);

export default authRoute;
