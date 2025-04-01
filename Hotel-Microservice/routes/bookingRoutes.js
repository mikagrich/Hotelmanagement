import express from "express";
import bookingService from "../services/bookingService.js";

const router = express.Router();

router.get("/", bookingService.getBookings);
router.get("/:id", bookingService.getBookingById);
router.post("/", bookingService.createBooking);
router.put("/:id", bookingService.updateBooking);
router.delete("/:id", bookingService.deleteBooking);

export default router;
