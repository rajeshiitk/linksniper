import Url from "../models/url.model";
import { Request, Response } from "express";
import generateUniqueID from "../utils/generateLUniqueId";
import { getLocationFromIp } from "../utils/getLocationFromIp";
import { IPinfo } from "node-ipinfo";
import ClickEvent from "../models/clickEvent.model";

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
  const ipAddress = req.clientIp;

  if (ipAddress) {
    try {
      const result = await getLocationFromIp(ipAddress);
      const { ip, city, region, country, loc, org, postal, timezone } =
        result as IPinfo; // Type assertion

      const data = await ClickEvent.create({
        ipAddress: ip,
        city: city,
        region: region,
        country: country,
        loc: loc,
        orgo: org,
        postal: postal,
        timezone: timezone,
      });

      console.log("data : " + data);

      const entry = await Url.findOneAndUpdate(
        { shortId },
        { $push: { clicksHistory: data._id }, $inc: { clicks: 1 } },
        { new: true }
      );
      // console.log(entry);
      if (entry) {
        res.redirect(entry.originalUrl);
      } else {
        res.status(404).json({ message: "URL not found" });
      }
    } catch (error) {
      console.error("Error in main function:", error);
    }
  } else {
    console.log("ipAddress is undefined");
    const data = await ClickEvent.create({
      ipAddress: "unknown",
      city: "unknown",
      region: "unknown",
      country: "unknown",
      loc: "unknown",
      orgo: "unknown",
      postal: "unknown",
      timezone: "unknown",
    });

    const entry = await Url.findOneAndUpdate(
      { shortId },
      { $push: { clicksHistory: data._id }, $inc: { clicks: 1 } },
      { new: true }
    );
    // console.log(entry);
    if (entry) {
      res.redirect(entry.originalUrl);
    } else {
      res.status(404).json({ message: "URL not found" });
    }
  }
}

export async function handleGetAnalytics(req: Request, res: Response) {
  const shortId = req.params.shortId;

  const result = await Url.findOne({ shortId }).populate("clicksHistory");

  if (result) {
    return res.json({
      totalClicks: result.clicks,
      analytics: result.clicksHistory,
    });
  } else {
    return res.status(404).json({ message: "URL not found" });
  }
}
