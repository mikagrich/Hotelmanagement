// hotel-microservice/services/roomService.js

const db = require("../models/roomModel");
const { v4: uuidv4 } = require("uuid");

exports.getRooms = (req, res) => {
    res.json(db.get("rooms").value());
};

exports.getRoomById = (req, res) => {
    const room = db.get("rooms").find({ id: req.params.id }).value();
    if (!room) return res.status(404).json({ error: "Zimmer nicht gefunden" });
    res.json(room);
};

exports.createRoom = (req, res) => {
    const newRoom = { id: uuidv4(), ...req.body };
    db.get("rooms").push(newRoom).write();
    res.status(201).json(newRoom);
};

exports.updateRoom = (req, res) => {
    const room = db.get("rooms").find({ id: req.params.id });
    if (!room.value()) return res.status(404).json({ error: "Zimmer nicht gefunden" });
    room.assign(req.body).write();
    res.json(room.value());
};

exports.deleteRoom = (req, res) => {
    db.get("rooms").remove({ id: req.params.id }).write();
    res.status(204).send();
};
