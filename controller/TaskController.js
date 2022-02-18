const Tasks = require("../modal/Task");
const moment = require("moment");

const list = async (req, res) => {
  try {
    const tasks = await Tasks.find().select("-__v");
    res.json({
      status: true,
      tasks: tasks,
      message: "Get tasks list successfully.",
    });
  } catch (e) {
    console.log("--- Tasks List ---", e);
    res.json({ status: false, message: "Something went wrong." });
  }
};

const create = async (req, res) => {
  const { task_name } = req.body;

  let create_task = new Tasks({
    task_name: task_name,
  });

  await create_task.save();

  res.json({ status: true, message: "Task created successfully." });
};

const updateStatus = async (req, res) => {
  const { task_id } = req.params;

  console.log("---task_id----", task_id);
  console.log(moment().format());

  await Tasks.findOneAndUpdate(
    { _id: task_id },
    { completion_date: moment().format(), is_completed: true },
    { new: true }
  );

  res.json({ status: true, message: "Task completed." });
};

module.exports = {
  create,
  list,
  updateStatus,
};
