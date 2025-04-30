import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import mqttClient from "../mqttClient.js";

const bookingService = {
  getBookings: async (req, res) => {
    await db.read();
    let bookings = db.data.bookings;
  
    if (req.query.guestId) {
      bookings = bookings.filter(b => b.guestId === req.query.guestId);
    }
  
    if (req.query.roomId) {
      bookings = bookings.filter(b => b.roomId === req.query.roomId);
    }
   
    if (req.query.checkInDate) {
      bookings = bookings.filter(b => b.checkInDate === req.query.checkInDate);
    }
  
    if (req.query.fromDate) {
      bookings = bookings.filter(b => new Date(b.checkInDate) >= new Date(req.query.fromDate));
    }
  
    if (req.query.toDate) {
      bookings = bookings.filter(b => new Date(b.checkInDate) <= new Date(req.query.toDate));
    }
  
    if (req.query.guestName) {
      bookings = bookings.filter(b =>
        b.guestName && b.guestName.toLowerCase().includes(req.query.guestName.toLowerCase())
      );
    }
  
    if (req.query.status) {
      bookings = bookings.filter(b => b.status === req.query.status);
    }
  
    res.json(bookings);
  },
  

  getBookingById: async (req, res) => {
    await db.read();
    const booking = db.data.bookings.find(b => b.id === req.params.id);
    if (!booking) return res.status(404).json({ error: "Buchung nicht gefunden" });
    res.json(booking);
  },

  createBooking: async (req, res) => {
    await db.read();
    const newBooking = { id: uuidv4(), ...req.body };
    db.data.bookings.push(newBooking);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/bookings", JSON.stringify({
      action: "created",
      url: `/bookings/${newBooking.id}`,
      data: newBooking
    }));

    res.status(201).json(newBooking);
  },

  updateBooking: async (req, res) => {
    await db.read();
    const booking = db.data.bookings.find(b => b.id === req.params.id);
    if (!booking) return res.status(404).json({ error: "Buchung nicht gefunden" });

    Object.assign(booking, req.body);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/bookings", JSON.stringify({
      action: "updated",
      url: `/bookings/${req.params.id}`,
      data: booking
    }));

    res.json(booking);
  },

  deleteBooking: async (req, res) => {
    await db.read();
    const deletedBooking = db.data.bookings.find(b => b.id === req.params.id);
    db.data.bookings = db.data.bookings.filter(b => b.id !== req.params.id);
    await db.write();

    if (deletedBooking) {
      mqttClient.publish("zimolong/hotel-microservice/bookings", JSON.stringify({
        action: "deleted",
        url: `/bookings/${req.params.id}`,
        data: deletedBooking
      }));
    }

    res.status(204).send();
  },
};

export default bookingService;
