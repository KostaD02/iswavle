const mongoose = require("mongoose");

const errorSchema = new mongoose.Schema({
  error_description: {
    type: String,
    minlength: 2,
    trim: true,
  },
  error_date: {
    type: String,
    minlength: 2,
    trim: true,
  },
});

const Error = mongoose.model("Error", errorSchema);

module.exports = { Error };