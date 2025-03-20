import { LowSync, JSONFileSync } from 'lowdb';

// Datenbank-Datei wird als JSON gespeichert
const db = new LowSync(new JSONFileSync('db.json'));

// Standard-Datenbankstruktur, falls Datei leer ist
db.read();
db.data ||= { hotels: [], rooms: [], bookings: [] };
db.write();

export default db;
