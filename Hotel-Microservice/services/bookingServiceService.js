import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

const bookingServiceService = {
  getAll: async (req, res) => {
    await db.read();
    let entries = db.data.booking_service || [];
  
    if (req.query.bookingId) {
      entries = entries.filter(entry => entry.bookingId === req.query.bookingId);
    }
  
    if (req.query.serviceId) {
      entries = entries.filter(entry => entry.serviceId === req.query.serviceId);
    }
  
    res.json(entries);
  },
  

  getById: async (req, res) => {
    await db.read();
    const item = db.data.booking_service.find(b => b.id === req.params.id);
    if (!item) return res.status(404).json({ error: "Eintrag nicht gefunden" });
    res.json(item);
  },

  create: async (req, res) => {
    await db.read();
  
    if (!db.data.booking_service) {
      db.data.booking_service = [];
    }
  
    const newItem = {
      id: uuidv4(),
      bookingId: req.body.bookingId,
      serviceId: req.body.serviceId
    };
  
    db.data.booking_service.push(newItem);
    await db.write();
    res.status(201).json(newItem);
  },
  

  update: async (req, res) => {
    await db.read();
    const item = db.data.booking_service.find(b => b.id === req.params.id);
    if (!item) return res.status(404).json({ error: "Eintrag nicht gefunden" });

    item.bookingId = req.body.bookingId || item.bookingId;
    item.serviceId = req.body.serviceId || item.serviceId;

    await db.write();
    res.json(item);
  },

  remove: async (req, res) => {
    await db.read();
    db.data.booking_service = db.data.booking_service.filter(b => b.id !== req.params.id);
    await db.write();
    res.status(204).send();
  }
};

export default bookingServiceService;
