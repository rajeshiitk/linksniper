import { Schema, Document, model } from "mongoose";

export interface IClickEvent extends Document {
  url: Schema.Types.ObjectId;
  timestamp: Date;
  ipAddress?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
}

const clickEventSchema = new Schema<IClickEvent>(
  {
    url: {
      type: Schema.Types.ObjectId,
      ref: "Url", // Reference to the URL it belongs to
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
      default: "unknown",
    },
    city: { type: String, default: "unknown" },
    region: { type: String, default: "unknown" },
    country: { type: String, default: "unknown" },
    loc: { type: String, default: "unknown" },
    org: { type: String, default: "unknown" },
    postal: { type: String, default: "unknown" },
    timezone: { type: String, default: "unknown" },
  },
  {
    timestamps: true,
  }
);

const ClickEvent = model<IClickEvent>("ClickEvent", clickEventSchema);

export default ClickEvent;
