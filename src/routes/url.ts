import { Router } from "express";
import { handleGenerateShortUrl, handleGetAnalytics } from "../controllers/url";

const urlRoute = Router();

urlRoute.post("/", handleGenerateShortUrl);
urlRoute.get("/analytics/:shortId", handleGetAnalytics);

export default urlRoute;
