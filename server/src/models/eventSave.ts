import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  tokenIn: {
    type: String,
    required: true,
  },
  tokenOut: {
    type: String,
    required: true,
  },
});

export const eventSchema = mongoose.model("EventSchema", EventSchema);
