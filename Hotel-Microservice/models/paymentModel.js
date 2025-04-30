import db from "../db.js";

class PaymentModel {
  static getAll() {
    return db.data.payments || [];
  }

  static getById(id) {
    return (db.data.payments || []).find(payment => payment.id === id);
  }

  static add(payment) {
    if (!db.data.payments) db.data.payments = [];
    db.data.payments.push(payment);
    db.write();
    return payment;
  }

  static update(id, updatedPayment) {
    const index = (db.data.payments || []).findIndex(payment => payment.id === id);
    if (index !== -1) {
      db.data.payments[index] = { ...db.data.payments[index], ...updatedPayment };
      db.write();
      return db.data.payments[index];
    }
    return null;
  }

  static delete(id) {
    if (!db.data.payments) db.data.payments = [];
    db.data.payments = db.data.payments.filter(payment => payment.id !== id);
    db.write();
  }
}

export default PaymentModel;
