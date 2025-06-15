import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

taskSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const Task = mongoose.model("Task", taskSchema);
export default Task;

