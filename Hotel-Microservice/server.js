// hotel-microservice/server.js

const express = require("express");
const bodyParser = require("body-parser");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes"); // NEU!

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes); // NEU!

app.listen(PORT, () => {
    console.log(`Hotel-Microservice läuft auf Port ${PORT}`);
});
