const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  pid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignTo: {
    type: String,
  },
  assignBy: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
  },
  isCompleted: {
    type: String,
  },
  comments: [
    {
      by: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
