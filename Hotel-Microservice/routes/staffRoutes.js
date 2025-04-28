import express from "express";
import staffService from "../services/staffService.js";

const router = express.Router();

router.get("/", staffService.getStaff);
router.get("/:id", staffService.getStaffById);
router.post("/", staffService.createStaff);
router.put("/:id", staffService.updateStaff);
router.delete("/:id", staffService.deleteStaff);

export default router;
