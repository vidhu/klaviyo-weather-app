import amqp from 'amqplib';
import { connect as mailConnect, SendMail } from './SendMail';
const QUEUE_NAME = 'email';

let conn = undefined;

(async () => {
  conn = await amqp.connect('amqp://user:bitnami@rabbitMQ');
  const mailConn = await mailConnect();
  const sendMail = new SendMail(mailConn);

  const ch = await conn.createChannel();
  ch.assertQueue(QUEUE_NAME, { durable: true });
  ch.consume(QUEUE_NAME, async msg => {
    const sub = JSON.parse(msg.content);
    console.log('[x] ' + JSON.parse(msg.content).email);

    try {
      await sendMail.sendMail(sub.email, sub.city);
      ch.ack(msg);
    } catch (ex) {
      console.error(ex);
    }
  });
})();

process.on('SIGTERM', async () => {
  await conn.close();
  process.exit(0);
});
