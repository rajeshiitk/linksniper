import dotenv from "dotenv";
import app from "./index";
import connectToMongoDb from "./database/mongodb";
import { PORT } from "./config";
// config .env path to .env.local
dotenv.config({ path: ".env.local" });

// connection to mongodb
connectToMongoDb();

// Start the  server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
