import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { connect as dbConnect } from './data/db';
import MailerService from './services/MailerService';
import SubscriptionRoute from './routes/subscribe';
import SendRoute from './routes/send';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/send', SendRoute);
app.use('/api/subscribe', SubscriptionRoute);

app.use('/api', (req, res) => {
  res.json('hello world!');
});

app.use(express.static(path.resolve(__dirname, '../', 'static')));

(async () => {
  await dbConnect();
  await MailerService.connect();
  console.log('Listening on port 5000');
  app.listen(5000);
})();
