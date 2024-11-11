import express from "express";
import { saveEvent, getAllEvents } from "../controllers/controllers";
let router = express.Router();

// EventRoutes
router.post("/saveEvent", saveEvent);
router.get("/getAllEvents", getAllEvents);

export default router;
