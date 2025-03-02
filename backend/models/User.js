import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name']
    },
    aadhaar: {
      type: String,
      required: [true, 'Please enter Aadhaar number'],
      unique: true,
      validate: [validator.isNumeric, 'Aadhaar must be numeric'],
      minlength: 12,
      maxlength: 12
    },
    voterId: {
      type: String,
      required: [true, 'Please enter Voter ID'],
      unique: true,
      validate: {
        validator: function(v) {
          return /^[A-Za-z]{3}\d{7}$/.test(v); // 3 letters + 7 digits
        },
        message: 'Voter ID must be in the format ABC1234567'
      }
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true,
      validate: [validator.isEmail, 'Enter valid email']
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: 6,
      select: false
    },
    constituency: {
      type: String,
      required: [true, 'Select constituency'],
      enum: ['north', 'south']
    },
    hasVoted: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['voter', 'officer'],
      default: 'voter'
    },
    otp: String,
    otpExpire: Date
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model('User', userSchema);
