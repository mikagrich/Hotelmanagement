import express from "express";
import bookingServiceService from "../services/bookingServiceService.js";

const router = express.Router();

router.get("/", bookingServiceService.getAll);
router.get("/:id", bookingServiceService.getById);
router.post("/", bookingServiceService.create);
router.put("/:id", bookingServiceService.update);
router.delete("/:id", bookingServiceService.remove);

export default router;
