import db from "../models/bookingModel.js";
import { v4 as uuidv4 } from "uuid";

const bookingService = {
  getBookings: (req, res) => {
    res.json(db.get("bookings").value());
  },

  getBookingById: (req, res) => {
    const booking = db.get("bookings").find({ id: req.params.id }).value();
    if (!booking) return res.status(404).json({ error: "Buchung nicht gefunden" });
    res.json(booking);
  },

  createBooking: (req, res) => {
    const newBooking = { id: uuidv4(), ...req.body };
    db.get("bookings").push(newBooking).write();
    res.status(201).json(newBooking);
  },

  updateBooking: (req, res) => {
    const booking = db.get("bookings").find({ id: req.params.id });
    if (!booking.value()) return res.status(404).json({ error: "Buchung nicht gefunden" });
    booking.assign(req.body).write();
    res.json(booking.value());
  },

  deleteBooking: (req, res) => {
    db.get("bookings").remove({ id: req.params.id }).write();
    res.status(204).send();
  },
};

export default bookingService; // ✅ WICHTIG: Export als Default!
