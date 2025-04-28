import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

const guestService = {
  getGuests: async (req, res) => {
    await db.read();
    res.json(db.data.guests);
  },

  getGuestById: async (req, res) => {
    await db.read();
    const guest = db.data.guests.find(g => g.id === req.params.id);
    if (!guest) return res.status(404).json({ error: "Gast nicht gefunden" });
    res.json(guest);
  },

  createGuest: async (req, res) => {
    await db.read();
    const newGuest = { id: uuidv4(), ...req.body };
    db.data.guests.push(newGuest);
    await db.write();

    res.status(201).json(newGuest);
  },

  updateGuest: async (req, res) => {
    await db.read();
    const guest = db.data.guests.find(g => g.id === req.params.id);
    if (!guest) return res.status(404).json({ error: "Gast nicht gefunden" });

    Object.assign(guest, req.body);
    await db.write();

    res.json(guest);
  },

  deleteGuest: async (req, res) => {
    await db.read();
    db.data.guests = db.data.guests.filter(g => g.id !== req.params.id);
    await db.write();

    res.status(204).send();
  },
};

export default guestService;
