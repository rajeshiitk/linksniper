import { Router } from "express";
import authController from "../controllers/auth.controller";
import { upload } from "../utils/multer";
import { authValidation } from "../validations/auth.validation";
// import { validationError } from "../midddlewares/validation";
import { verifyToken } from "../midddlewares/verifyToken";

const authRoute = Router();

authRoute.route("/sign-up").post(
  authValidation.signUpUser, // this middleware will validate the request body
  //   validationError, // this middleware will check for any validation errors and throw an error if any
  upload.single("image"),
  authController.signUpUser
);

authRoute
  .route("/login")
  .post(authValidation.loginUser, authController.loginUser);

authRoute.route("/profile").get(verifyToken, authController.profile);

export default authRoute;
