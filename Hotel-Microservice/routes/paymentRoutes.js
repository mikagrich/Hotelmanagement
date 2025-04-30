import express from "express";
import paymentService from "../services/paymentService.js";

const router = express.Router();

router.get("/", paymentService.getPayments);
router.get("/:id", paymentService.getPaymentById);
router.post("/", paymentService.createPayment);
router.put("/:id", paymentService.updatePayment);
router.delete("/:id", paymentService.deletePayment);

export default router;


