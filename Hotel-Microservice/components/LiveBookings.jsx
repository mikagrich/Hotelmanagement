import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function LiveBookings() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = mqtt.connect("wss://mqtt.zimolong.eu");

    client.on("connect", () => {
      console.log("✅ MQTT verbunden (Frontend)");

      client.subscribe("hotel-microservice/booking/#", (err) => {
        if (!err) {
          console.log("📡 Abonniert: hotel-microservice/booking/#");
        }
      });
    });

    client.on("message", (topic, message) => {
      const payload = JSON.parse(message.toString());
      setMessages(prev => [...prev, { topic, payload }]);
    });

    return () => client.end();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">📡 Live-Buchungen</h2>
      {messages.map((msg, index) => (
        <div key={index} className="border p-2 my-1 rounded">
          <strong>{msg.topic}</strong>
          <pre>{JSON.stringify(msg.payload, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
