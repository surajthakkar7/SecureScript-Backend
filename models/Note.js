const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Notes", noteSchema);

module.exports = Note;
