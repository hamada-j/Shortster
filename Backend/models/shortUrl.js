const mongoose = require('mongoose');

const shortsterSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    unique: true,
    
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  lastVisit: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('ShortUrl', shortsterSchema);
