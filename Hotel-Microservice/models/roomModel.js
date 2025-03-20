import db from '../db.js';

class RoomModel {
  static getAll() {
    return db.data.rooms;
  }

  static getById(id) {
    return db.data.rooms.find(room => room.id === id);
  }

  static add(room) {
    db.data.rooms.push(room);
    db.write(); // Speichern
    return room;
  }

  static update(id, updatedRoom) {
    const index = db.data.rooms.findIndex(room => room.id === id);
    if (index !== -1) {
      db.data.rooms[index] = { ...db.data.rooms[index], ...updatedRoom };
      db.write();
      return db.data.rooms[index];
    }
    return null;
  }

  static delete(id) {
    db.data.rooms = db.data.rooms.filter(room => room.id !== id);
    db.write();
  }
}

export default RoomModel;
