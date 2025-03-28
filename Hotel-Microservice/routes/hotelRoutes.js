import express from "express";
import hotelService from "../services/hotelService.js";

const router = express.Router();

router.get("/", hotelService.getHotels);
router.get("/:id", hotelService.getHotelById);
router.post("/", hotelService.createHotel);
router.put("/:id", hotelService.updateHotel);
router.delete("/:id", hotelService.deleteHotel);

export default router; // ✅ WICHTIG: Default-Export hinzufügen!
