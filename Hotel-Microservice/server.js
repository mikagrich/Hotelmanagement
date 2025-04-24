import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

const swaggerDocument = YAML.load("./openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/hotels", hotelRoutes);
app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
