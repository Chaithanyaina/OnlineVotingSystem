import express from 'express';
import { protect, officerAuth } from '../middleware/auth.js';
import { getProfile, getAllVoters, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', protect, getProfile);
router.get('/voters', protect, officerAuth, getAllVoters);
router.put('/update', protect, updateUser);

export default router;
