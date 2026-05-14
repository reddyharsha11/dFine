// server/utils/sendMail.js
const nodemailer = require('nodemailer');

function getTransport() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendMail({ to, subject, text, html }) {
  const transporter = getTransport();
  if (!transporter) {
    console.warn('[email] Skipped (EMAIL_USER/EMAIL_PASS not set)');
    return { skipped: true };
  }
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  await transporter.sendMail({ from, to, subject, text, html });
  return { sent: true };
}

module.exports = { sendMail };
