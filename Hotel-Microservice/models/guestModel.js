import db from "../db.js";

class GuestModel {
  static getAll() {
    return db.data.guests;
  }

  static getById(id) {
    return db.data.guests.find(guest => guest.id === id);
  }

  static add(guest) {
    db.data.guests.push(guest);
    db.write();
    return guest;
  }

  static update(id, updatedGuest) {
    const index = db.data.guests.findIndex(guest => guest.id === id);
    if (index !== -1) {
      db.data.guests[index] = { ...db.data.guests[index], ...updatedGuest };
      db.write();
      return db.data.guests[index];
    }
    return null;
  }

  static delete(id) {
    db.data.guests = db.data.guests.filter(guest => guest.id !== id);
    db.write();
  }
}

export default GuestModel;
