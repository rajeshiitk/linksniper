import { Schema, model, Document } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortId: string;
  author: string;
  clicks: number;
  clicksHistory: Schema.Types.ObjectId[];
  createdAt: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
      trim: true, // trim white spaces
    },
    author: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    clicksHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "ClickEvent", // You can create another schema for detailed click events
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Url = model<IUrl>("Url", urlSchema);

export default Url;
