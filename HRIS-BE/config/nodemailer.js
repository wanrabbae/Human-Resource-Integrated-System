const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function sendEmail(params) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: params.to,
      subject: params.subject,
      html: params.message,
    });
    return info;
  } catch (error) {
    return error;
  }
}

module.exports = { sendEmail };
