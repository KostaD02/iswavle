const mongoose = require("mongoose");

const codeExampleSchema = new mongoose.Schema({
  code: {
    type: Array,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const CodeExample = mongoose.model("CodeExample", codeExampleSchema);

module.exports = { CodeExample };