import express from 'express';
import MailerService from '../services/MailerService';
import { SubscriptionModel } from '../data/models/SubscriptionModel';

const router = express.Router();

router.post('/', async (req, res) => {
  // TODO: Implement some sort of authentication

  // Get all the subscriptions
  const subs = await SubscriptionModel.find({});

  // Send them to mailer microservices
  subs.forEach(sub => MailerService.sendToQueue(sub));

  // Return subscription count
  res.json({ count: subs.length });
});

export default router;
