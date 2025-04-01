import express from "express";
import bodyParser from "body-parser"; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();
app.use(bodyParser.json()); 
app.use(express.json()); 

const swaggerDocument = YAML.load(path.resolve("openapi.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/hotels", hotelRoutes);
app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}\nSwagger-Doku: http://localhost:${PORT}/api-docs`));
