import db from "../db.js";

class BookingServiceModel {
  static getAll() {
    return db.data.booking_service;
  }

  static getById(id) {
    return db.data.booking_service.find(entry => entry.id === id);
  }

  static add(entry) {
    db.data.booking_service.push(entry);
    db.write();
    return entry;
  }

  static delete(id) {
    db.data.booking_service = db.data.booking_service.filter(entry => entry.id !== id);
    db.write();
  }
}

export default BookingServiceModel;
