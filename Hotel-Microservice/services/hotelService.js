// hotel-microservice/services/hotelService.js

const db = require("../models/hotelModel");
const { v4: uuidv4 } = require("uuid");

exports.getHotels = (req, res) => {
    res.json(db.get("hotels").value());
};

exports.getHotelById = (req, res) => {
    const hotel = db.get("hotels").find({ id: req.params.id }).value();
    if (!hotel) return res.status(404).json({ error: "Hotel nicht gefunden" });
    res.json(hotel);
};

exports.createHotel = (req, res) => {
    const newHotel = { id: uuidv4(), ...req.body };
    db.get("hotels").push(newHotel).write();
    res.status(201).json(newHotel);
};

exports.updateHotel = (req, res) => {
    const hotel = db.get("hotels").find({ id: req.params.id });
    if (!hotel.value()) return res.status(404).json({ error: "Hotel nicht gefunden" });
    hotel.assign(req.body).write();
    res.json(hotel.value());
};

exports.deleteHotel = (req, res) => {
    db.get("hotels").remove({ id: req.params.id }).write();
    res.status(204).send();
};