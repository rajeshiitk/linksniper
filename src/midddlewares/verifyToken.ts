// //
// declare module "express" {
//   interface Request {
//     user: string; // Change the type accordingly
//   }
// }

import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET_KEY } from "../config";
dotenv.config({ path: ".env.local" });

// import "../types/customRequest.d.ts";

export const verifyToken = async (
  // req: Request & { headers: { [key: string]: string } },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth_token = req.headers["authorization"];
  if (!auth_token || !auth_token.startsWith("Bearer ")) {
    next(new ApiError(httpStatus.UNAUTHORIZED, "No token provided"));
    return;
  }

  const token = auth_token.split(" ")[1];

  console.log("token", token);

  if (!token) {
    next(new ApiError(httpStatus.UNAUTHORIZED, "No token provided"));
    //  return new ApiError(httpStatus.UNAUTHORIZED, "No token provided");
    return;
  }

  try {
    const { _id } = jwt.verify(token, JWT_SECRET_KEY as string) as {
      _id: string;
    };
    console.log("id", _id);
    // @ts-expect-error  Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
    req.user = _id;
    next();
  } catch (error) {
    // throw new ApiError(httpStatus.BAD_REQUEST, "Invalid token");
    next(error);
  }
};
