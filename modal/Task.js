const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TasksSchema = new Schema(
  {
    task_name: {
      type: String,
      default: "",
      trim: true,
    },
    completion_date: {
        type: String,
        default: "",
        trim: true,
      },
    is_completed: {
      type: Boolean,
      default: false,
      trim: true,
    },
  },
  { collection: "tasks" }
);

TasksSchema.set("timestamps", true);
module.exports = mongoose.model("tasks", TasksSchema);
