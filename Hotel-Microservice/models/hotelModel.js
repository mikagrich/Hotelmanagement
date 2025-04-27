import db from '../db.js';

class HotelModel {
  static getAll() {
    return db.data.hotels;
  }

  static getById(id) {
    return db.data.hotels.find(hotel => hotel.id === id);
  }

  static add(hotel) {
    db.data.hotels.push(hotel);
    db.write();
    return hotel;
  }

  static update(id, updatedHotel) {
    const index = db.data.hotels.findIndex(hotel => hotel.id === id);
    if (index !== -1) {
      db.data.hotels[index] = { ...db.data.hotels[index], ...updatedHotel };
      db.write();
      return db.data.hotels[index];
    }
    return null;
  }

  static delete(id) {
    db.data.hotels = db.data.hotels.filter(hotel => hotel.id !== id);
    db.write();
  }
}

export default HotelModel;
