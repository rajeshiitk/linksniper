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

export async function handleRedirectToOriginalUrl(req: Request, res: Response) {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $inc: { clicks: 1 } },
    { new: true } // return the updated document if it's false it will return the old document
  ); // increment clicks by 1

  console.log(entry);
  if (entry) {
    res.redirect(entry.originalUrl);
  } else {
    res.status(404).json({ message: "URL not found" });
  }
}
