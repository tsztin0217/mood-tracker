const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  nextSteps: {
    type: String
  },
  takeaway: {
    type: String
  },
  progress: {
    type:
      String,
    enum: [
      'No Action Needed',
      'Not Started',
      'In Progress',
      'Completed'],
    default:
      'No Action Needed',
    required: true
  }
});


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logs: [logSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
