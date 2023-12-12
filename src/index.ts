import express from "express";
import dotenv from "dotenv";

//config .env path
dotenv.config({ path: ".env.local" });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
