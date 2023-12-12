import { Schema, Document, model } from "mongoose";

export interface IClickEvent extends Document {
  url: Schema.Types.ObjectId;
  timestamp: Date;
  ipAddress: string;
  location: string;
  // Add other relevant details as needed
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
      required: true,
    },
    location: {
      type: String,
    },
    // Add other fields as needed
  },
  {
    timestamps: true,
  }
);

const ClickEvent = model<IClickEvent>("ClickEvent", clickEventSchema);

export default ClickEvent;
