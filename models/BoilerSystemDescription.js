const mongoose = require("mongoose");

const boilerSystemDescriptionSchema = new mongoose.Schema({
  systemDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "BoilerSystemDescription",
  boilerSystemDescriptionSchema
);
