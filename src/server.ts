import dotenv from "dotenv";
import app from "./index";
import connectToMongoDb from "./database/mongodb";
// config .env path to .env.local
dotenv.config({ path: ".env.local" });

// connection to mongodb
connectToMongoDb();

// Start the  server
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
