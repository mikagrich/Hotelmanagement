import express from "express";
import invoiceService from "../services/invoiceService.js";

const router = express.Router();

router.get("/", invoiceService.getInvoices);
router.get("/:id", invoiceService.getInvoiceById);
router.post("/", invoiceService.createInvoice);
router.put("/:id", invoiceService.updateInvoice);
router.delete("/:id", invoiceService.deleteInvoice);

export default router;
