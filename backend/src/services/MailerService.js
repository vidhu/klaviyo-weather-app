import ampq from 'amqplib';

const QUEUE_NAME = 'email';

let conn;
let ch;
const connect = async () => {
  conn = await ampq.connect('amqp://user:bitnami@rabbitMQ');
  ch = await conn.createChannel();
  await ch.assertQueue(QUEUE_NAME, { durable: true });
};

const sendToQueue = sub => ch.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(sub)));

export default {
  connect,
  sendToQueue
};
