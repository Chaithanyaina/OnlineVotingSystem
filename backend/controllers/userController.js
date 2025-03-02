import User from '../models/User.js';

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Voters
export const getAllVoters = async (req, res) => {
  try {
    const voters = await User.find({ role: 'voter' }).select('-password');
    res.status(200).json({ success: true, data: voters });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User Profile
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
