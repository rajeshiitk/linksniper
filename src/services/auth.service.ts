import httpStatus from "http-status";
import User from "../models/user.model";
import ApiError from "../utils/ApiError";

class authService {
  // TODO: fix issue with avator upload and save
  static async signUpUser(body: any) {
    const { name, email, password } = body;
    if (!name || !email || !password) {
      throw new Error("Please provide all the required fields");
    }

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
}

export default authService;