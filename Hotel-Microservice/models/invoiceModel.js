import db from "../db.js";

class InvoiceModel {
  static getAll() {
    return db.data.invoices || [];
  }

  static getById(id) {
    return (db.data.invoices || []).find(invoice => invoice.id === id);
  }

  static add(invoice) {
    if (!db.data.invoices) db.data.invoices = [];
    db.data.invoices.push(invoice);
    db.write();
    return invoice;
  }

  static update(id, updatedInvoice) {
    const index = (db.data.invoices || []).findIndex(invoice => invoice.id === id);
    if (index !== -1) {
      db.data.invoices[index] = { ...db.data.invoices[index], ...updatedInvoice };
      db.write();
      return db.data.invoices[index];
    }
    return null;
  }

  static delete(id) {
    if (!db.data.invoices) db.data.invoices = [];
    db.data.invoices = db.data.invoices.filter(invoice => invoice.id !== id);
    db.write();
  }
}

export default InvoiceModel;
