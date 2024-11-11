import { eventSchema } from "../models/eventSave";

const saveEvent = (req: any, res: any) => {
  const { amount, timestamp, tokenIn, tokenOut } = req.body;

  const ev = new eventSchema({
    amount,
    timestamp,
    tokenIn,
    tokenOut,
  });

  ev.save()
    .then((saved: any) => {
      console.log("save event:", saved);
      res.json({ message: "Saved successfully", data: saved });
    })
    .catch((error: any) => {
      console.error("Error Saved event:", error);
      res.status(500).json({ message: "Failed to Saved event" });
    });
};

const getAllEvents = (req: any, res: any) => {
  eventSchema
    .find({})
    .then((events: any) => {
      res.json({ message: "Events retrieved successfully", data: events });
    })
    .catch((error: any) => {
      console.error("Error retrieving events:", error);
      res.status(500).json({ message: "Failed to retrieve events" });
    });
};

export { saveEvent, getAllEvents };
