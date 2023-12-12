import Url from "../models/url";
import { Request, Response } from "express";
import generateUniqueID from "../utils/generateLUniqueId";

export async function handleGenerateShortUrl(req: Request, res: Response) {
  const body = req.body;
  console.log(body);
  if (!body.originalUrl) {
    return res.status(400).json({
      error: "originalUrl is required",
    });
  }

  const originalUrl = body.originalUrl;
  console.log(originalUrl);
  const shortId = generateUniqueID();

  await Url.create({
    originalUrl: originalUrl,
    shortId: shortId,
    author: "test",
    clicksHistory: [],
  });
  console.log("Created new URL");
  return res.status(200).json({
    shortId: shortId,
  });
}

export default handleGenerateShortUrl;
