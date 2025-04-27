import mqtt from "mqtt";

const client = mqtt.connect("wss://test.mosquitto.org:8081");

client.on("connect", () => {
  console.log("✅ Verbunden mit öffentlichem Broker (Mosquitto)");
});

export default client;
