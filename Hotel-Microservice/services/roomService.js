import db from "../models/roomModel.js";
import { v4 as uuidv4 } from "uuid";

const roomService = {
  getRooms: (req, res) => {
    res.json(db.get("rooms").value());
  },

  getRoomById: (req, res) => {
    const room = db.get("rooms").find({ id: req.params.id }).value();
    if (!room) return res.status(404).json({ error: "Raum nicht gefunden" });
    res.json(room);
  },

  createRoom: (req, res) => {
    const newRoom = { id: uuidv4(), ...req.body };
    db.get("rooms").push(newRoom).write();
    res.status(201).json(newRoom);
  },

  updateRoom: (req, res) => {
    const room = db.get("rooms").find({ id: req.params.id });
    if (!room.value()) return res.status(404).json({ error: "Raum nicht gefunden" });
    room.assign(req.body).write();
    res.json(room.value());
  },

  deleteRoom: (req, res) => {
    db.get("rooms").remove({ id: req.params.id }).write();
    res.status(204).send();
  }
};

export default roomService; // ✅ Default-Export hinzugefügt!
