const mongoose = require('mongoose');

const boilerValueSchema = new mongoose.Schema({
  boilerValue: {
    type: String,
    required: true,
  },
  priceBoilerValue: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model('BoilerValue', boilerValueSchema);
