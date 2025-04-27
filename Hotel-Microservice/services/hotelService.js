import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import mqttClient from "../mqttClient.js"; 

const hotelService = {
  getHotels: (req, res) => {
    res.json(db.data.hotels);
  },

  getHotelById: (req, res) => {
    const hotel = db.data.hotels.find(hotel => hotel.id === req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel nicht gefunden" });
    res.json(hotel);
  },

  createHotel: async (req, res) => {
    await db.read();
    const newHotel = { id: uuidv4(), ...req.body };
    db.data.hotels.push(newHotel);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/hotels", JSON.stringify({
      action: "created",
      url: `/hotels/${newHotel.id}`,
      data: newHotel
    }));

    res.status(201).json(newHotel);
  },

  updateHotel: async (req, res) => {
    await db.read();
    const hotel = db.data.hotels.find(hotel => hotel.id === req.params.id);
    if (!hotel) return res.status(404).json({ error: "Hotel nicht gefunden" });

    Object.assign(hotel, req.body);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/hotels", JSON.stringify({
      action: "updated",
      url: `/hotels/${req.params.id}`,
      data: hotel
    }));

    res.json(hotel);
  },

  deleteHotel: async (req, res) => {
    await db.read();
    const deletedHotel = db.data.hotels.find(hotel => hotel.id === req.params.id);
    db.data.hotels = db.data.hotels.filter(hotel => hotel.id !== req.params.id);
    await db.write();

    if (deletedHotel) {
      mqttClient.publish("zimolong/hotel-microservice/hotels", JSON.stringify({
        action: "deleted",
        url: `/hotels/${req.params.id}`,
        data: deletedHotel
      }));
    }

    res.status(204).send();
  }
};

export default hotelService;
