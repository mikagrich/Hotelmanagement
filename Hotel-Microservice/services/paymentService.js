import db from "../db.js";
import { v4 as uuidv4 } from "uuid";
import mqttClient from "../mqttClient.js";

const paymentService = {
  getPayments: async (req, res) => {
    await db.read();
    const payments = db.data.payments || [];
    res.json(payments);
  },

  getPaymentById: async (req, res) => {
    await db.read();
    const payment = (db.data.payments || []).find(p => p.id === req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  },

  createPayment: async (req, res) => {
    await db.read();
    const newPayment = { id: uuidv4(), ...req.body };
    if (!db.data.payments) db.data.payments = [];
    db.data.payments.push(newPayment);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/payments", JSON.stringify({
      action: "created",
      url: `/payments/${newPayment.id}`,
      data: newPayment
    }));

    res.status(201).json(newPayment);
  },

  updatePayment: async (req, res) => {
    await db.read();
    const payment = (db.data.payments || []).find(p => p.id === req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    Object.assign(payment, req.body);
    await db.write();

    mqttClient.publish("zimolong/hotel-microservice/payments", JSON.stringify({
      action: "updated",
      url: `/payments/${req.params.id}`,
      data: payment
    }));

    res.json(payment);
  },

  deletePayment: async (req, res) => {
    await db.read();
    const deletedPayment = (db.data.payments || []).find(p => p.id === req.params.id);
    db.data.payments = (db.data.payments || []).filter(p => p.id !== req.params.id);
    await db.write();

    if (deletedPayment) {
      mqttClient.publish("zimolong/hotel-microservice/payments", JSON.stringify({
        action: "deleted",
        url: `/payments/${req.params.id}`,
        data: deletedPayment
      }));
    }

    res.status(204).send();
  }
};

export default paymentService;
