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

  createHotel: async (req, res) => { // ✅ async für await db.write()
    const newHotel = { id: uuidv4(), ...req.body };
    db.data.hotels.push(newHotel);
    await db.write(); // ✅ write() muss await sein!
    res.status(201).json(newHotel);
  },

  updateHotel: async (req, res) => { // ✅ async für await db.write()
    const hotel = db.data.hotels.find(hotel => hotel.id === req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel nicht gefunden" });

    Object.assign(hotel, req.body);
    await db.write(); // ✅ write() muss await sein!
    res.json(hotel);
  },

  deleteHotel: async (req, res) => { // ✅ async für await db.write()
    db.data.hotels = db.data.hotels.filter(hotel => hotel.id !== req.params.id);
    await db.write(); // ✅ write() muss await sein!
    res.status(204).send();
  }
};

export default hotelService; // ✅ Default-Export bleibt!
