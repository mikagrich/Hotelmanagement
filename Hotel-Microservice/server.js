import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingServiceRoutes from "./routes/bookingServiceRoutes.js";
import invoiceRoute from "./routes/invoiceRoutes.js";
import paymentRoute from "./routes/paymentRoutes.js";
import mqttClient from "./mqttClient.js";

const app = express();
const port = 3000;

app.use(express.json());

const swaggerDocument = YAML.load("./openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/hotels", hotelRoutes);
app.use("/bookings", bookingRoutes);
app.use("/rooms", roomRoutes);
app.use("/guests", guestRoutes);
app.use("/staff", staffRoutes);
app.use("/services", serviceRoutes);
app.use("/booking-services", bookingServiceRoutes);
app.use("/invoices", invoiceRoute);
app.use("/payments", paymentRoute);

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
  console.log(`Swagger-Doku: http://localhost:${port}/api-docs`);
});
