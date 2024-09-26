const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },
  task_todo: {
    type: String,
    required: true,
  },
  task_status: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ToDoList", ToDoSchema);
