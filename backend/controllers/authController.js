import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateOTP, sendOTP } from '../utils/sendOTP.js';

// Register User
// controllers/authController.js
// controllers/authController.js
export const register = async (req, res) => {
  try {
    const { name, aadhaar, voterId, email, password, constituency } = req.body;

    // Check for existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create({
      name,
      aadhaar,
      voterId,
      email,
      password,
      constituency,
    });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    await sendOTP(user.email, otp); // Send to email

    res.status(201).json({
      success: true,
      message: 'OTP sent to email',
      email: user.email
    });

  } catch (err) {
    console.error("Registration Error:", err);

    // Handle OTP sending errors
    if (err.message.includes("Failed to send OTP")) {
      return res.status(500).json({ 
        error: "OTP could not be sent. Please try again later." 
      });
    }

    // Handle other errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(', ') });
    }

    return res.status(400).json({ error: err.message });
  }
};

// Verify OTP
// controllers/authController.js
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user with matching email, OTP, and non-expired OTP
    const user = await User.findOne({ 
      email,
      otp,
      otpExpire: { $gt: Date.now() } // Check if OTP is not expired
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid OTP or expired' });
    }

    // Clear OTP fields and mark user as verified
    user.otp = undefined;
    user.otpExpire = undefined;
    user.isVerified = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.status(200).json({ success: true, token });

  } catch (err) {
    console.error("OTP Verification Error:", err);
    res.status(500).json({ error: 'Server error during OTP verification' });
  }
};
// Officer Login
// controllers/authController.js
export const officerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt for:", username); // Debugging

    // Find officer by voterId (username) and role
    const officer = await User.findOne({ voterId: username, role: 'officer' });

    if (!officer) {
      console.log("Officer not found"); // Debugging
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if matchPassword exists
    if (!officer.matchPassword) {
      console.error("matchPassword method is missing in User model");
      return res.status(500).json({ error: "Password validation error" });
    }

    // Check password
    const isMatch = await officer.matchPassword(password);
    if (!isMatch) {
      console.log("Password mismatch"); // Debugging
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: officer._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES || '1d',
    });

    console.log("Login successful for:", username); // Debugging
    res.status(200).json({ success: true, token });

  } catch (err) {
    console.error("Login Error:", err); // Logs the full error in the console
    res.status(500).json({ error: 'Server error' });
  }
};
