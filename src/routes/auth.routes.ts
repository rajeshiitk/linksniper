import { Router } from "express";
import authController from "../controllers/auth.controller";
import { upload } from "../utils/multer";

const authRoute = Router();

authRoute
  .route("/sign-up")
  .post(upload.single("image"), authController.signUpUser);

export default authRoute;
