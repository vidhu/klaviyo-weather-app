"use strict";

var _amqplib = _interopRequireDefault(require("amqplib"));

var _SendMail = require("./SendMail");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QUEUE_NAME = 'email';
let conn = undefined;

(async () => {
  conn = await _amqplib.default.connect('amqp://user:bitnami@rabbitMQ');
  const mailConn = await (0, _SendMail.connect)();
  const sendMail = new _SendMail.SendMail(mailConn);
  const ch = await conn.createChannel();
  ch.assertQueue(QUEUE_NAME, {
    durable: true
  });
  ch.consume(QUEUE_NAME, async msg => {
    const sub = JSON.parse(msg.content);
    console.log('[x] ' + JSON.parse(msg.content).email);
    await sendMail.sendMail(sub.email, sub.city);
    ch.ack(msg);
  });
})();

process.on('SIGTERM', async () => {
  await conn.close();
  process.exit(0);
});
//# sourceMappingURL=app.js.map