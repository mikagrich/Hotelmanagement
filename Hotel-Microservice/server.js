import express from "express";
import bodyParser from "body-parser"; // Korrigiert!
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();
app.use(bodyParser.json()); // Middleware für JSON
app.use(express.json()); // Alternative ohne body-parser

app.use("/hotels", hotelRoutes);
app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
