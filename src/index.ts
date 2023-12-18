import express from "express";
import dotenv from "dotenv";
import urlRoute from "./routes/url";
import { handleRedirectToOriginalUrl } from "./controllers/url";
import requestIp from "request-ip";
import { ipMiddleware } from "./utils/ipExtract";
import router from "./routes/index";
//config .env path to .env.local
dotenv.config({ path: ".env.local" });

const app = express();

// Middlewares
app.use(express.json());
app.use(requestIp.mw());

app.use("/api/v1", router);

// Routers
app.use("/url", urlRoute);

// Redirect to original URL
app.get("/:shortId", ipMiddleware, handleRedirectToOriginalUrl);

export default app;
