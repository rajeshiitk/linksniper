import express from "express";
import dotenv from "dotenv";
import urlRoute from "./routes/url";
import connectToMongoDb from "./database/mongodb";
import { handleRedirectToOriginalUrl } from "./controllers/url";
import requestIp from "request-ip";
import { ipMiddleware } from "./utils/ipExtract";
import path from "path";
//config .env path to .env.local
dotenv.config({ path: ".env.local" });

const app = express();

// connection to mongodb
connectToMongoDb();

// Middlewares
app.use(express.json());
app.use(requestIp.mw());

app.set("view engine", "ejs");
app.set("views", "src/views");

console.log(path.join(__dirname, "public"));
// Add this line at the top
app.use(express.static(path.join(__dirname, "public")));

// Add this line after app is defined
app.use("/style.css", express.static(__dirname + "/public/style.css"));

// Routers
app.use("/url", urlRoute);

// Redirect to original URL
app.get("/short/:shortId", ipMiddleware, handleRedirectToOriginalUrl);

app.get("/home", (req, res) => {
  res.render("home", { shortUrl: "kya mtlb kuch bhi" });
});

// Start the  server
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
