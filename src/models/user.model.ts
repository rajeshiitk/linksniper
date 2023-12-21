import { Schema, Document, model } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export interface IUserMethods {
  ComparePassword: (password: string) => Promise<boolean>;
  UpdatePassword: (password: string) => Promise<void>;
  GenerateToken: (userId: string) => Promise<string>;
  GenerateForgotPasswordToken: (
    userId: string,
    email: string
  ) => Promise<string>;
  VerifyUpdatePasswordToken: (token: string) => Promise<boolean>;
}

export interface IUser extends Document, IUserMethods {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// multiple extends in interface

// type interface for ComparePassword method

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required."],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required."],
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://picsum.photos/200",
    },
  },
  {
    timestamps: true,
  }
);

// middlewares
userSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (user.isModified("password")) {
    // hash password
    user.password = await bcryptjs.hash(user.password, 10);
  }
  next();
});

// methods for userSchema

// compare password
userSchema.methods.ComparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as IUser;
  return await bcryptjs.compare(password, user.password);
};

// update password
userSchema.methods.UpdatePassword = async function (
  password: string
): Promise<void> {
  const user = this as IUser;
  user.password = await bcryptjs.hash(password, 10);
  await user.save();
};

// jwt token methods

// generate token
userSchema.methods.GenerateToken = async function (
  userId: string
): Promise<string> {
  const token = jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

// generate forgot password token
userSchema.methods.GenerateForgotPasswordToken = async function (
  userId: string,
  email: string
): Promise<string> {
  const token = jwt.sign(
    { _id: userId },
    (process.env.JWT_SECRET_KEY as string) + email,
    {
      expiresIn: "1h",
    }
  );
  return token;
};
// verify token
userSchema.methods.VerifyUpdatePasswordToken = async function (token: string) {
  const user = this as IUser;
  const decoded = jwt.verify(
    token,
    (process.env.JWT_SECRET_KEY as string) + user.email
  );
  if (decoded) {
    return true;
  }

  return false;
};

const User = model<IUser>("User", userSchema);

export default User;
