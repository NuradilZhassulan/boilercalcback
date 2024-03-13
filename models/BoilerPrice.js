const mongoose = require('mongoose');

const boilerPriceSchema = new mongoose.Schema({
  power1: {
    type: String,
    required: true
  },
  power2: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('BoilerPrice', boilerPriceSchema);
