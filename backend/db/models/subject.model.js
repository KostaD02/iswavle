const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  index:{
    type: Number
  },
  name: {
    type: String,
    minlength: 2,
    trim: true,
    required: true
  },
  isSelectable: {
    type: Boolean,
    required: true
  },
  subject: {
    type: String,
    minlength: 2,
    trim: true,
    required: true
  },
  route: {
    type: String,
    minlength: 2,
    trim: true,
    required: true
  },
  prefix: {
    type: String,
    minlength: 2,
    trim: true,
  },
  translate: {
    type: Array,
  },
  data: {
    type: Array,
  },
  createdAt: {
    type: Date,
    minlength: 2,
    trim: true,
  },
  description: {
    type: String,
    minlength: 2,
    trim: true,
  }
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = { Subject };