import express from "express";
import dotenv from "dotenv";
import urlRoute from "./routes/url";
import connectToMongoDb from "./database/mongodb";
import { handleRedirectToOriginalUrl } from "./controllers/url";
import requestIp from "request-ip";
import { ipMiddleware } from "./utils/ipExtract";
//config .env path to .env.local
dotenv.config({ path: ".env.local" });

const app = express();

// connection to mongodb
connectToMongoDb();

// Middlewares
app.use(express.json());
app.use(requestIp.mw());

// Routers
app.use("/url", urlRoute);

// Redirect to original URL
app.get("/:shortId", ipMiddleware, handleRedirectToOriginalUrl);

// Start the  server
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
