import db from '../db.js';

class BookingModel {
  static getAll() {
    return db.data.bookings;
  }

  static getById(id) {
    return db.data.bookings.find(booking => booking.id === id);
  }

  static add(booking) {
    db.data.bookings.push(booking);
    db.write();
    return booking;
  }

  static update(id, updatedBooking) {
    const index = db.data.bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
      db.data.bookings[index] = { ...db.data.bookings[index], ...updatedBooking };
      db.write();
      return db.data.bookings[index];
    }
    return null;
  }

  static delete(id) {
    db.data.bookings = db.data.bookings.filter(booking => booking.id !== id);
    db.write();
  }
}

export default BookingModel;
