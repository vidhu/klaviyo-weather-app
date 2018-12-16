import express from 'express';
import { SubscriptionModel } from '../data/models/SubscriptionModel';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const sub = await new SubscriptionModel(req.body).save();
    return res.json(sub);
  } catch (error) {
    return res.status(400).json(error.errors);
  }
});

router.delete('/:subid', async (req, res) => {
  try {
    const sub = await SubscriptionModel.findByIdAndDelete(req.params.subid);
    if (!sub) {
      return res.status(400).json('Subscription not found');
    }
    return res.json(sub);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;
