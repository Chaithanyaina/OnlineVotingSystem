import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter candidate name']
    },
    party: {
      type: String,
      required: [true, 'Please enter party name']
    },
    constituency: {
      type: String,
      required: [true, 'Select constituency'],
      enum: ['north', 'south']
    },
    votes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('Candidate', candidateSchema);
