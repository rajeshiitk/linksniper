import { Schema, Document, model } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUserMethods {
  ComparePassword: (password: string) => Promise<boolean>;
  UpdatePassword: (password: string) => Promise<void>;
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

// methods

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

const User = model<IUser>("User", userSchema);

export default User;
