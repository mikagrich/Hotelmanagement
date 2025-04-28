import express from "express";
import serviceService from "../services/serviceService.js";

const router = express.Router();

router.get("/", serviceService.getServices);
router.get("/:id", serviceService.getServiceById);
router.post("/", serviceService.createService);
router.put("/:id", serviceService.updateService);
router.delete("/:id", serviceService.deleteService);

export default router;
