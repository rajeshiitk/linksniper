import express from "express";
import dotenv from "dotenv";
import urlRoute from "./routes/url";
import connectToMongoDb from "./database/mongodb";
//config .env path to .env.local
dotenv.config({ path: ".env.local" });

const app = express();

// connection to mongodb
connectToMongoDb();

// Middlewares
app.use(express.json());

// Routers
app.use("/url", urlRoute);

// Start the  server
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
