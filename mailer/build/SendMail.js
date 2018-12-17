"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendMail = exports.connect = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connect = () => _nodemailer.default.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: parseInt(process.env.SMTP_SECURE) === 1,
  auth: {
    user: process.env.SMTP_USER || 'en57otb2vldrenmg@ethereal.email',
    pass: process.env.SMTP_PWD || 'ckZWafnyfGFvqQqsHN'
  }
});

exports.connect = connect;

const generateEmail = city => _react.default.createElement("div", null, _react.default.createElement("h1", null, "Hello World"), _react.default.createElement("ul", null, [0, 1, 2, 3, 4].map(n => _react.default.createElement("li", {
  key: n
}, n))));

class SendMail {
  constructor(transporter) {
    this.transporter = transporter;
  }

  async sendMail(email, city) {
    let mailOptions = {
      from: '"Vidhu Bhatnagar" <vidhu1911@gmail.com>',
      to: email,
      subject: 'weather update',
      html: generateEmail(city)
    };
    const info = await this.transporter.sendMail(mailOptions);
    console.log(`Message send: ${info.messageId}`);
    console.log(`Preview URL: ${_nodemailer.default.getTestMessageUrl(info)}`);
    return info;
  }

}

exports.SendMail = SendMail;
//# sourceMappingURL=SendMail.js.map