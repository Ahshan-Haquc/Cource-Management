const nodemailer = require("nodemailer");

const sendEmailPassRecovery = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });

    const mailOptions = {
      from: `"DevZone Academy" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully for password recovery to:", to);
  } catch (error) {
    console.error("Error sending email for password recovery:", error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmailPassRecovery;
