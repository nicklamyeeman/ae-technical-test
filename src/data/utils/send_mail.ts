"use server";

import { createTransport } from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_PORT = process.env.SMTP_SERVER_PORT;
const SMTP_SERVER_EMAIL = process.env.SMTP_SERVER_EMAIL;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST || "smtp.gmail.com",
  port: Number(SMTP_SERVER_PORT) || 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_EMAIL!,
    pass: SMTP_SERVER_PASSWORD!,
  },
});

export async function sendMail({
  sendTo,
  subject,
  text,
  html,
}: {
  sendTo: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    await transporter.verify();
    await transporter.sendMail({
      from: SMTP_SERVER_EMAIL,
      to: sendTo,
      subject: subject,
      text: text,
      html: html ? html : "",
    });
  } catch (error) {
    console.error("Something Went Wrong", error);
  }
}
