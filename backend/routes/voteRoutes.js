import express from 'express';
import { protect, officerAuth } from '../middleware/auth.js';
import { submitVote, getResults, getStats } from '../controllers/voteController.js';

const router = express.Router();

router.post('/submit', protect, submitVote);
router.get('/results', protect, getResults);
// routes/voteRoutes.js
router.get('/stats', protect, officerAuth, getStats);

export default router;
