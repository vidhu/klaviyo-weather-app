import nodemailer from 'nodemailer';
import { getWeatherStatus } from './WeatherBit';
import { Email, getSubject } from './Email';
import React from 'react';
import ReactDomServer from 'react-dom/server';

const smtpSettings = {
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: parseInt(process.env.SMTP_SECURE) === 1,
  auth: {
    user: process.env.SMTP_USER || 'en57otb2vldrenmg@ethereal.email',
    pass: process.env.SMTP_PWD || 'ckZWafnyfGFvqQqsHN'
  }
};
console.log('SMTP Settings:');
console.log(smtpSettings);

export const connect = () => nodemailer.createTransport(smtpSettings);

export class SendMail {
  constructor(transporter) {
    this.transporter = transporter;
  }

  async sendMail(email, city) {
    const weatherStatus = await getWeatherStatus(city);

    const emailMarkup = ReactDomServer.renderToStaticMarkup(<Email {...weatherStatus} />);
    let mailOptions = {
      from: '"Vidhu Shresth Bhatnagar" <vidhu1911@gmail.com>',
      to: email,
      subject: getSubject(weatherStatus),
      html: emailMarkup
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Email sent');
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    return info;
  }
}
