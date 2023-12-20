import httpStatus from "http-status";
import User from "../models/user.model";
import ApiError from "../utils/ApiError";

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
}

export default authService;
