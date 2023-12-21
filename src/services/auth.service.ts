import httpStatus from "http-status";
import User from "../models/user.model";
import ApiError from "../utils/ApiError";
import fs from "fs";
import path from "path";
import MailService from "./mail.service";

interface IUpdateObj {
  name?: string;
  email?: string;
  avatar?: string;
}

// interface of multer file object
// interface IFile {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   destination: string;
//   filename: string;
//   path: string;
//   size: number;
// }

class authService {
  // TODO: fix issue with avator upload and save
  static async signUpUser(body: any, file: any) {
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // TODO: implement file delete function is user already exists
      // delete file if user already exists
      if (fs.existsSync(file.path)) {
        // fs.unlinkSync(path.join(path.resolve(), "/src/uploads/" + file.filename));
        fs.unlinkSync(file.path);
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
      }
      // if(!file) {
      //   throw new ApiError(httpStatus.BAD_REQUEST, "Please provide a profile picture");
      //   return;
      // }
    }

    const newUser = await User.create({
      name,
      email,
      password,
      avatar: file.filename,
    });
    newUser.password = "";

    return {
      message: "User created successfully",
      data: newUser,
    };
  }

  static async loginUser(body: any) {
    const { email, password } = body;
    // if (!email || !password) {
    //   throw new Error("Please provide all the required fields");
    // }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
      return;
    }

    const isMatch = await existingUser.ComparePassword(password);
    if (!isMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid credentials");
    }

    const token = await existingUser.GenerateToken(existingUser._id);

    if (!token) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    return {
      message: "User logged in successfully",
      token: token,
    };
  }

  static async profile(userId: string) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }

    return {
      message: "User profile",
      data: user,
    };
  }

  static async updateUser(userId: string, body: any, file: any) {
    const { name, email } = body;

    const user = await User.findById(userId);
    if (!user) {
      // delete file if user not found
      if (file) {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
      throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }

    const updateObj: IUpdateObj = {};
    if (name) updateObj.name = name;
    if (email) updateObj.email = email;
    if (file) {
      // delete old file if exists
      if (
        fs.existsSync(path.join(path.resolve(), "/src/uploads/" + user.avatar)) // here existsSync() will check if the file exists or not
      ) {
        fs.unlinkSync(path.join(path.resolve(), "/src/uploads/" + user.avatar)); // here unlinkSync() will delete the file
      }
      updateObj.avatar = file.filename;
    }

    const newUser = await User.findByIdAndUpdate(userId, updateObj, {
      new: true,
    });

    return {
      message: "User updated successfully",
      data: newUser,
    };
  }

  static async forgotPassword(body: any) {
    const { email } = body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }

    const token = await existingUser.GenerateForgotPasswordToken(
      existingUser._id,
      existingUser.email
    );

    if (!token) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }

    const mailService = MailService.getInstance();

    const to = email;
    const subject = "Password Reset ✔";
    // const text = "Hello world?";
    const html = `
    <h1>Forget Password</h1>
    hey ,${existingUser.name}
    <a href="http://localhost:500/update-password?token=${token}">click here to update your password</a>
    `;

    await mailService.sendMail(to, subject, html);

    return {
      message: "Password reset link sent to your email",
    };
  }

  static async updatePassword(body: any) {
    const { email, password, confirmPassword } = body;

    if (password !== confirmPassword) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Password and confirm password must be same"
      );
    }

    const existingUser = await User.findOne({ email });

    // const existingUser = User.findOneAndUpdate(
    //   { email },
    //   { password },
    //   { new: true }
    // );

    if (!existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }

    if (!existingUser.VerifyUpdatePasswordToken(body.token)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Session expired");
    }

    await existingUser.UpdatePassword(password);

    return {
      message: "Password updated successfully",
    };
  }
}

export default authService;
