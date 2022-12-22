import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "kafka-producer",
    brokers: ["fancy-tahr-14935-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username:
        "ZmFuY3ktdGFoci0xNDkzNSQQlKxUuZ6m5Q0UVwE8aXhaNldu9nXhdVUh743rd0k",
      password: "d9ce6a3c2d144d50a1d5b057bd717895",
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitacao de amizade!",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
