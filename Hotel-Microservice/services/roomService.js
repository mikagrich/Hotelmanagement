import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import mqttClient from "./mqttClient.js";

const roomService = {
  getRooms: async (req, res) => {
    await db.read();
    res.json(db.data.rooms);
  },

  getRoomById: async (req, res) => {
    await db.read();
    const room = db.data.rooms.find(r => r.id === req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  },

  createRoom: async (req, res) => {
    await db.read();
    const newRoom = { id: uuidv4(), ...req.body };
    db.data.rooms.push(newRoom);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/rooms", JSON.stringify({
      action: "created",
      url: `/rooms/${newRoom.id}`,
      data: newRoom
    }));

    res.status(201).json(newRoom);
  },

  updateRoom: async (req, res) => {
    await db.read();
    const room = db.data.rooms.find(r => r.id === req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    Object.assign(room, req.body);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/rooms", JSON.stringify({
      action: "updated",
      url: `/rooms/${req.params.id}`,
      data: room
    }));

    res.json(room);
  },

  deleteRoom: async (req, res) => {
    await db.read();
    const deletedRoom = db.data.rooms.find(r => r.id === req.params.id);
    db.data.rooms = db.data.rooms.filter(r => r.id !== req.params.id);
    await db.write();

    if (deletedRoom) {
      mqttClient.publish("zimolong/hotel-microservice/rooms", JSON.stringify({
        action: "deleted",
        url: `/rooms/${req.params.id}`,
        data: deletedRoom
      }));
    }

    res.status(204).send();
  },
};

export default roomService;
