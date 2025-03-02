import express from 'express';
import { protect, officerAuth } from '../middleware/auth.js';
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate
} from '../controllers/candidateController.js';

const router = express.Router();

router.route('/')
  .get(getCandidates)
  .post(protect, officerAuth, createCandidate);

router.route('/:id')
  .put(protect, officerAuth, updateCandidate)
  .delete(protect, officerAuth, deleteCandidate);

export default router;
