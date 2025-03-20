// hotel-microservice/routes/hotelRoutes.js

const express = require("express");
const router = express.Router();
const hotelService = require("../services/hotelService");

router.get("/", hotelService.getHotels);
router.get("/:id", hotelService.getHotelById);
router.post("/", hotelService.createHotel);
router.put("/:id", hotelService.updateHotel);
router.delete("/:id", hotelService.deleteHotel);

module.exports = router;