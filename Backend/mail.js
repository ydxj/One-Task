import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Brevo uses STARTTLS on port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to, subject, message) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text: message,
    });

    console.log("✅ Email sent to:", to);
    // console.log("📨 Message ID:", info.messageId);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
}
