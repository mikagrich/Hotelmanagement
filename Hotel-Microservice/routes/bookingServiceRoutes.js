import express from "express";
import bookingServiceService from "../services/bookingServiceService.js";

const router = express.Router();

router.get("/", bookingServiceService.getAll);
router.post("/", bookingServiceService.create);
router.delete("/:id", bookingServiceService.delete);

export default router;
