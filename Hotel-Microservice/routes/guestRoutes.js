import express from "express";
import guestService from "../services/guestService.js";

const router = express.Router();

router.get("/", guestService.getGuests);
router.get("/:id", guestService.getGuestById);
router.post("/", guestService.createGuest);
router.put("/:id", guestService.updateGuest);
router.delete("/:id", guestService.deleteGuest);

export default router;
