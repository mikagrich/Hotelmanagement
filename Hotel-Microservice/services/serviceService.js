import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

const serviceService = {
  getServices: async (req, res) => {
    await db.read();
    let services = db.data.services;
  
    if (req.query.name) {
      services = services.filter(s => s.name && s.name.toLowerCase().includes(req.query.name.toLowerCase()));
    }
  
    if (req.query.price) {
      services = services.filter(s => s.price && s.price == req.query.price);
    }
  
    res.json(services);
  },
  

  getServiceById: async (req, res) => {
    await db.read();
    const service = db.data.services.find(s => s.id === req.params.id);
    if (!service) return res.status(404).json({ error: "Service nicht gefunden" });
    res.json(service);
  },

  createService: async (req, res) => {
    await db.read();
    const newService = { id: uuidv4(), ...req.body };
    db.data.services.push(newService);
    await db.write();

    res.status(201).json(newService);
  },

  updateService: async (req, res) => {
    await db.read();
    const service = db.data.services.find(s => s.id === req.params.id);
    if (!service) return res.status(404).json({ error: "Service nicht gefunden" });

    Object.assign(service, req.body);
    await db.write();

    res.json(service);
  },

  deleteService: async (req, res) => {
    await db.read();
    db.data.services = db.data.services.filter(s => s.id !== req.params.id);
    await db.write();

    res.status(204).send();
  },
};

export default serviceService;
