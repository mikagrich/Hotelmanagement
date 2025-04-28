import db from "../db.js";

class ServiceModel {
  static getAll() {
    return db.data.services;
  }

  static getById(id) {
    return db.data.services.find(service => service.id === id);
  }

  static add(service) {
    db.data.services.push(service);
    db.write();
    return service;
  }

  static update(id, updatedService) {
    const index = db.data.services.findIndex(service => service.id === id);
    if (index !== -1) {
      db.data.services[index] = { ...db.data.services[index], ...updatedService };
      db.write();
      return db.data.services[index];
    }
    return null;
  }

  static delete(id) {
    db.data.services = db.data.services.filter(service => service.id !== id);
    db.write();
  }
}

export default ServiceModel;
