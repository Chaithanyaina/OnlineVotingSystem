import express from 'express';
import { register, verifyOTP, officerLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

// ✅ Modify the request body to expect email instead of mobile
router.post('/verify-otp', (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required." });
  }
  req.body = { email, otp }; // Ensure request body format is correct
  next();
}, verifyOTP);

router.post('/officer-login', officerLogin);

export default router;
