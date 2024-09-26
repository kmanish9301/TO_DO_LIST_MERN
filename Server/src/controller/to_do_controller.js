const ToDoModel = require("../model/to_do_model");

const CreateToDo = async (req, res) => {
  try {
    const { task_name, task_todo, task_status } = req.body;
    if (!task_name || !task_todo) {
      return res.status(400).json({
        error: true,
        message: "Task name and description are required.",
      });
    }
    const toDoExists = await ToDoModel.findOne({ task_name });
    if (toDoExists) {
      return res
        .status(400)
        .json({ error: true, message: "Task already exists." });
    }
    const to_do_data = await ToDoModel.create({
      task_name,
      task_todo,
      task_status: task_status !== undefined ? task_status : false,
    });
    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: to_do_data,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to create task.",
      error: error.message,
    });
  }
};

const GetAllTasks = async (req, res) => {
  try {
    const tasks = await ToDoModel.find();
    if (tasks.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No tasks found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully.",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks.",
      error: error.message,
    });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task_name, task_todo, task_status } = req.body;

    const task = await ToDoModel.findById(id);
    if (!task) {
      return res.status(404).json({
        error: true,
        message: "Task not found.",
      });
    }

    // Update the task fields if provided
    task.task_name = task_name || task.task_name;
    task.task_todo = task_todo || task.task_todo;
    task.task_status =
      task_status !== undefined ? task_status : task.task_status;

    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to update task.",
      error: error.message,
    });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await ToDoModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        error: true,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      error: true,
      message: "Failed to delete task.",
      error: error.message,
    });
  }
};

module.exports = { CreateToDo, GetAllTasks, UpdateTask, DeleteTask };
