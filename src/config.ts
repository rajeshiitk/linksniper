import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Export the variables
export const PORT = process.env.PORT || 3000;
export const MONGODB_URL = process.env.MONGODB_URL || "";
export const IPINFO_TOKEN = process.env.IPINFO_TOKEN || "";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export const NODE_MAILER_HOST = process.env.NODE_MAILER_HOST || "";
export const NODE_MAILER_PORT = process.env.NODE_MAILER_PORT || "";
export const NODE_MAILER_EMAIL = process.env.NODE_MAILER_EMAIL || "";
export const NODE_MAILER_PASSWORD = process.env.NODE_MAILER_PASSWORD || "";
