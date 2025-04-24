import mqtt from "mqtt";

const client = mqtt.connect("wss://mqtt.zimolong.eu"); // über WebSocket!

client.on("connect", () => {
  console.log("✅ MQTT verbunden");
});

export default client;
