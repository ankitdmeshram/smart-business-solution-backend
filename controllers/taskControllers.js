const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const {
      pid,
      title,
      description,
      assignTo,
      assignBy,
      dueDate,
      priority,
      isCompleted,
      comments,
      created_at,
      updated_at,
    } = req.body;
    if (!pid || !title) {
      return res.status(400).json({
        success: false,
        message: "Project Id and Task Title fields are required",
      });
    }
    const TaskDetails = await Task.create({
      pid,
      title,
      description,
      assignTo,
      assignBy,
      dueDate,
      priority,
      isCompleted,
      comments,
    });
    
    return res.status(200).json({
      success: true,
      message: "Tasks Created Successfully",
      taskDetails: TaskDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.allTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      tasks: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const {
      _id,
      pid,
      title,
      description,
      assignTo,
      assignBy,
      dueDate,
      priority,
      isCompleted,
      comments,
      created_at,
      updated_at,
    } = req.body;

    const body = {
      _id,
      pid,
      title,
      description,
      assignTo,
      assignBy,
      dueDate,
      priority,
      isCompleted,
      comments,
      created_at,
      updated_at,
    };

    if (!_id || !pid || !title) {
      return res.status(400).json({
        success: false,
        message: "Id and pid and title fields are required",
      });
    }
    const task = await Task.findByIdAndUpdate(_id, body);
    return res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: body,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.viewTasksByPID = async (req, res) => {
  try {
    const { pid } = req.body;

    const Tasks = await Task.find({ pid: pid }).sort({ created_at: -1 });

    if (Tasks.length == 0) {
      return res.status(200).json({
        success: true,
        message: "No Tasks Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks found successfully",
      tasks: Tasks,
    });
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: `Something went wrong ${err}`,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { _id, pid, email } = req.body;

    if (!_id && !pid && !email) {
      return res.status(404).json({
        success: false,
        message: "Id and project id required fields",
      });
    }

    const task = await Task.find({ _id: _id });

    if (!task || task.length == 0 || task == undefined) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    console.log("tasks", task);

    const projects = await Project.find({ _id: pid });

    console.log("Projects", projects);

    if (projects?.owner == email || projects?.project_team.includes(email)) {
      await Task.findByIdAndDelete({ _id: _id });
      res.status(200).json({
        success: true,
        message: "Task Deleted Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task Cannot be deleted successfully",
      error,
    });
  }
};
