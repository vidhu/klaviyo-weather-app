import express from 'express';
import { SubscriptionModel } from '../data/models/SubscriptionModel';
import ampq from 'amqplib';

const router = express.Router();

const QUEUE_NAME = 'email';

router.post('/', async (req, res) => {
  const subs = await SubscriptionModel.find({});

  const conn = await ampq.connect('amqp://user:bitnami@rabbitMQ');
  const ch = await conn.createChannel();
  ch.assertQueue(QUEUE_NAME, { durable: true });

  subs.forEach(sub => ch.sendToQueue('email', Buffer.from(JSON.stringify(sub))));
  res.json({ count: subs.length });
});

export default router;
