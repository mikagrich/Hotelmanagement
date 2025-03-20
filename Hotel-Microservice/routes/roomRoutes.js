// hotel-microservice/routes/roomRoutes.js

const express = require("express");
const router = express.Router();
const roomService = require("../services/roomService");

router.get("/", roomService.getRooms);
router.get("/:id", roomService.getRoomById);
router.post("/", roomService.createRoom);
router.put("/:id", roomService.updateRoom);
router.delete("/:id", roomService.deleteRoom);

module.exports = router;
