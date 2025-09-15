// server/utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT == '465', // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendMail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: `"ByteAcademy" <no-reply@greenuniversity.edu>`,
    to,
    subject,
    html
  });

  // If you use Ethereal in dev you can get preview url
  // in production , i have to use another except ethereal
  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log('Preview URL:', previewUrl);

  return info;
}

module.exports = { sendMail, transporter };
