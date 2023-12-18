import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

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
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
