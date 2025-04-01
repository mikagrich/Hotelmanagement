import db from "../db.js"; // ✅ Nur diesen Import beibehalten!
import { v4 as uuidv4 } from "uuid";

const hotelService = {
  getHotels: (req, res) => {
    res.json(db.data.hotels); // ✅ Direkt auf db.data zugreifen!
  },

  getHotelById: (req, res) => {
    const hotel = db.data.hotels.find(hotel => hotel.id === req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel nicht gefunden" });
    res.json(hotel);
  },

  createHotel: (req, res) => {
    const newHotel = { id: uuidv4(), ...req.body };
    db.get("hotels").push(newHotel).write();
    res.status(201).json(newHotel);
  },

  updateHotel: async (req, res) => {
    const hotel = db.data.hotels.find(hotel => hotel.id === req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel nicht gefunden" });

    Object.assign(hotel, req.body);
    await db.write(); 
    res.json(hotel);
  },

  deleteHotel: async (req, res) => { 
    db.data.hotels = db.data.hotels.filter(hotel => hotel.id !== req.params.id);
    await db.write();
    res.status(204).send();
  }
};

export default hotelService;
