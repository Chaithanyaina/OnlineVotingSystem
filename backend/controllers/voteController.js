import User from '../models/User.js';
import Candidate from '../models/Candidate.js';

// Submit Vote
export const submitVote = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.hasVoted) {
      return res.status(400).json({ error: 'Already voted' });
    }

    const candidate = await Candidate.findById(req.body.candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // Increment candidate votes
    candidate.votes += 1;
    await candidate.save();

    // Mark user as voted
    user.hasVoted = true;
    await user.save();

    res.status(200).json({ success: true, message: 'Vote submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Election Results
export const getResults = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ votes: -1 }); // Sort by votes in descending order
    res.status(200).json({ success: true, data: candidates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Voting Statistics
// controllers/voteController.js
export const getStats = async (req, res) => {
  try {
    const totalVoters = await User.countDocuments({ role: 'voter' });
    const voted = await User.countDocuments({ hasVoted: true });

    res.status(200).json({
      success: true,
      data: { totalVoters, voted, notVoted: totalVoters - voted }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};