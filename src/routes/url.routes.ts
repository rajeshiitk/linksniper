import { NextFunction, Request, Response, Router } from "express";
import { handleGenerateShortUrl, handleGetAnalytics } from "../controllers/url";

const urlRoute = Router();

urlRoute.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("hello");
    next();
  },
  handleGenerateShortUrl
);
urlRoute.get("/analytics/:shortId", handleGetAnalytics);

export default urlRoute;
