import { Low, JSONFile } from 'lowdb';

const adapter = new JSONFile('db.json');
const db = new Low(adapter);

await db.read();
db.data = db.data || { hotels: [], bookings: [] }; // Falls die Datei leer ist, setzen wir Standardwerte

export default db;
