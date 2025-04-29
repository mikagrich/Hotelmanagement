import { Low, JSONFile } from 'lowdb';

const adapter = new JSONFile('db.json');
const db = new Low(adapter);

await db.read();
db.data ||= {
  hotels: [],
  rooms: [],
  guests: [],
  bookings: [],
  staff: [],
  services: [],
  booking_service: []
};

export default db;
