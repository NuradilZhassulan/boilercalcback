const mongoose = require("mongoose");

const boilerExtraServiceSchema = new mongoose.Schema({
  nameExtraService: {
    type: String,
    required: true,
  },
  priceExtraService: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("BoilerExtraService", boilerExtraServiceSchema);
