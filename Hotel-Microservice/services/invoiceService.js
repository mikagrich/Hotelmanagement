import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import mqttClient from "../mqttClient.js";

const invoiceService = {
  getInvoices: async (req, res) => {
    await db.read();
    const invoices = db.data.invoices || [];
    res.json(invoices);
  },

  getInvoiceById: async (req, res) => {
    await db.read();
    const invoice = (db.data.invoices || []).find(i => i.id === req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  },

  createInvoice: async (req, res) => {
    await db.read();
    const newInvoice = { id: uuidv4(), ...req.body };
    if (!db.data.invoices) db.data.invoices = [];
    db.data.invoices.push(newInvoice);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/invoices", JSON.stringify({
      action: "created",
      url: `/invoices/${newInvoice.id}`,
      data: newInvoice
    }));

    res.status(201).json(newInvoice);
  },

  updateInvoice: async (req, res) => {
    await db.read();
    const invoice = (db.data.invoices || []).find(i => i.id === req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    Object.assign(invoice, req.body);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/invoices", JSON.stringify({
      action: "updated",
      url: `/invoices/${req.params.id}`,
      data: invoice
    }));

    res.json(invoice);
  },

  deleteInvoice: async (req, res) => {
    await db.read();
    const deletedInvoice = (db.data.invoices || []).find(i => i.id === req.params.id);
    db.data.invoices = (db.data.invoices || []).filter(i => i.id !== req.params.id);
    await db.write();

    if (deletedInvoice) {
      mqttClient.publish("zimolong/hotel-microservice/invoices", JSON.stringify({
        action: "deleted",
        url: `/invoices/${req.params.id}`,
        data: deletedInvoice
      }));
    }

    res.status(204).send();
  }
};

export default invoiceService;
