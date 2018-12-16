import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import top100Cities from '../../top100Cities';

const SubscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: email => isEmail(email),
        message: prop => `${prop.value} is not a valid email`
      }
    },
    city: { type: String, required: true, enum: top100Cities }
  },
  { collection: 'subscription' }
);

const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

export { SubscriptionSchema, SubscriptionModel };
