import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

const bookingServiceService = {
  getAll: async (req, res) => {
    await db.read();
    res.json(db.data.booking_service);
  },

  create: async (req, res) => {
    await db.read();
    const newEntry = { id: uuidv4(), ...req.body }; // erwartet { bookingId, serviceId }
    db.data.booking_service.push(newEntry);
    await db.write();

    res.status(201).json(newEntry);
  },

  delete: async (req, res) => {
    await db.read();
    db.data.booking_service = db.data.booking_service.filter(entry => entry.id !== req.params.id);
    await db.write();

    res.status(204).send();
  },
};

export default bookingServiceService;
