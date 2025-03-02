// utils/sendOTP.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Voting System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. Valid for 10 minutes.`,
      html: `<b>${otp}</b> is your OTP code. It will expire in 10 minutes.`
    });
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send OTP email');
  }
};