import db from "./db.js";
import { v4 as uuidv4 } from "uuid";
import mqttClient from "../mqttClient.js"; // 👈 MQTT-Client importieren

const bookingService = {
  getBookings: async (req, res) => {
    await db.read();
    res.json(db.data.bookings);
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

    // 🟢 MQTT-Publish bei neuer Buchung
    mqttClient.publish("hotel-microservice/booking/created", JSON.stringify(newBooking));

    res.status(201).json(newBooking);
  },

  updateBooking: async (req, res) => {
    await db.read();
    const booking = db.data.bookings.find(b => b.id === req.params.id);
    if (!booking) return res.status(404).json({ error: "Buchung nicht gefunden" });

    Object.assign(booking, req.body);
    await db.write();

    // 🟡 MQTT-Publish bei Update
    mqttClient.publish("hotel-microservice/booking/updated", JSON.stringify(booking));

    res.json(booking);
  },

  deleteBooking: async (req, res) => {
    await db.read();
    const deletedBooking = db.data.bookings.find(b => b.id === req.params.id);
    db.data.bookings = db.data.bookings.filter(b => b.id !== req.params.id);
    await db.write();

    // 🔴 MQTT-Publish bei Löschung (optional ID mitschicken)
    if (deletedBooking) {
      mqttClient.publish("hotel-microservice/booking/deleted", JSON.stringify({ id: deletedBooking.id }));
    }

    res.status(204).send();
  },
};

export default bookingService;
