import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

const staffService = {
  getStaff: async (req, res) => {
    await db.read();
    let staff = db.data.staff;
  
    if (req.query.name) {
      staff = staff.filter(s => s.name && s.name.toLowerCase().includes(req.query.name.toLowerCase()));
    }
  
    if (req.query.position) {
      staff = staff.filter(s => s.position && s.position.toLowerCase().includes(req.query.position.toLowerCase()));
    }
  
    res.json(staff);
  },
  

  getStaffById: async (req, res) => {
    await db.read();
    const staff = db.data.staff.find(s => s.id === req.params.id);
    if (!staff) return res.status(404).json({ error: "Mitarbeiter nicht gefunden" });
    res.json(staff);
  },

  createStaff: async (req, res) => {
    await db.read();
    const newStaff = { id: uuidv4(), ...req.body };
    db.data.staff.push(newStaff);
    await db.write();

    res.status(201).json(newStaff);
  },

  updateStaff: async (req, res) => {
    await db.read();
    const staff = db.data.staff.find(s => s.id === req.params.id);
    if (!staff) return res.status(404).json({ error: "Mitarbeiter nicht gefunden" });

    Object.assign(staff, req.body);
    await db.write();

    res.json(staff);
  },

  deleteStaff: async (req, res) => {
    await db.read();
    db.data.staff = db.data.staff.filter(s => s.id !== req.params.id);
    await db.write();

    res.status(204).send();
  },
};

export default staffService;
