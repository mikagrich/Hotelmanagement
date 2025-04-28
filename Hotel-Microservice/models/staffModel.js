import db from "../db.js";

class StaffModel {
  static getAll() {
    return db.data.staff;
  }

  static getById(id) {
    return db.data.staff.find(staff => staff.id === id);
  }

  static add(staff) {
    db.data.staff.push(staff);
    db.write();
    return staff;
  }

  static update(id, updatedStaff) {
    const index = db.data.staff.findIndex(staff => staff.id === id);
    if (index !== -1) {
      db.data.staff[index] = { ...db.data.staff[index], ...updatedStaff };
      db.write();
      return db.data.staff[index];
    }
    return null;
  }

  static delete(id) {
    db.data.staff = db.data.staff.filter(staff => staff.id !== id);
    db.write();
  }
}

export default StaffModel;
