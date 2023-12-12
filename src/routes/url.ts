import { Router } from "express";
import handleGenerateShortUrl from "../controllers/url";

const urlRoute = Router();

urlRoute.post("/", handleGenerateShortUrl);
urlRoute.get("/", (req, res) => {
  res.send("Hello world");
});

export default urlRoute;
