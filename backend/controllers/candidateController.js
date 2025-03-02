import Candidate from '../models/Candidate.js';

// Get All Candidates
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({ success: true, data: candidates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a Candidate
export const createCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json({ success: true, data: candidate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Candidate
export const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({ success: true, data: candidate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Candidate
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
