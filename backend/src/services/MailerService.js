import ampq from 'amqplib';

const QUEUE_NAME = 'email';

let conn;
let ch;

/**
 * Connect to ampq server
 */
const connect = async () => {
  conn = await ampq.connect('amqp://user:bitnami@rabbitMQ');
  ch = await conn.createChannel();
  await ch.assertQueue(QUEUE_NAME, { durable: true });
};

/**
 * 
 * @param {Object} sub Subscription information
 * @param {String} sub._id Subscription id
 * @param {String} sub.email User's email
 * @param {String} sub.city user's city
 */
const sendToQueue = sub => ch.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(sub)));

export default {
  connect,
  sendToQueue
};
