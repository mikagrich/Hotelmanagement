import express from "express";
import roomService from "../services/roomService.js";

const router = express.Router();

router.get("/", roomService.getRooms);
router.get("/:id", roomService.getRoomById);
router.post("/", roomService.createRoom);
router.put("/:id", roomService.updateRoom);
router.delete("/:id", roomService.deleteRoom);

export default router;
