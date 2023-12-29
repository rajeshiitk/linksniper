import express from "express";
import dotenv from "dotenv";
// import urlRoute from "./routes/url";
import { handleRedirectToOriginalUrl } from "./controllers/url";
import requestIp from "request-ip";
import { ipMiddleware } from "./utils/ipExtract";
import router from "./routes/index";
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import { ErrorHandler } from "./midddlewares/Error";
import path from "path";
//config .env path to .env.local
dotenv.config({ path: ".env.local" });
import cors from "cors";

const app = express();
app.use(cors());

// Middlewares
app.use(express.json());
app.use(requestIp.mw());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router);

// static files
app.use("/static/", express.static(path.join(path.resolve(), "/src/uploads")));
// console.log(path.join(path.resolve(), "uploads"));

// Routers
// app.use("/api/v1", urlRoute);

// Redirect to original URL
app.get("/:shortId", ipMiddleware, handleRedirectToOriginalUrl);

app.use(() => {
  throw new ApiError(httpStatus.NOT_FOUND, "Page not found");
});

app.use(ErrorHandler);

export default app;
