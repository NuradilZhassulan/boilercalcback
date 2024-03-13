const mongoose = require("mongoose");

const boilerCountExitsSchema = new mongoose.Schema({
  countExit: {
    type: String,
    required: true,
  },
  priceCountExit: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("BoilerCountExits", boilerCountExitsSchema);
