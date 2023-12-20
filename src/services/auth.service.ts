import httpStatus from "http-status";
import User from "../models/user.model";
import ApiError from "../utils/ApiError";
import fs from "fs";
import path from "path";

interface IUpdateObj {
  name?: string;
  email?: string;
  avatar?: string;
}

class authService {
  // TODO: fix issue with avator upload and save
  static async signUpUser(body: any) {
    const { name, email, password } = body;
    // if (!name || !email || !password) {
    //   throw new Error("Please provide all the required fields");
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // TODO: implement file delete function is user already exists
      throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
      return;
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

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
}

export default authService;
