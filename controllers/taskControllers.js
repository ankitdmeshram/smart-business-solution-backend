const Task = require("../models/Task");

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

exports.updateProject = async (req, res) => {
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
      _id: _id,
      pid: pid,
      title: title,
      description: description,
      assignTo: assignTo,
      assignBy: assignBy,
      dueDate: dueDate,
      priority: priority,
      isCompleted: isCompleted,
      comments: comments,
      created_at: created_at,
      updated_at: updated_at,
    };

    if (!_id || !pid || !title) {
      return res.status(400).json({
        success: false,
        message: "Id and pid and title fields are required",
      });
    }
    const Task = await Task.findByIdAndUpdate(_id, body);
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

    const Tasks = await Task.find({ pid: pid });

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

exports.deleteProject = async (req, res) => {
  try {
    const { _id, email } = req.body;
    const project = await Project.findById({ _id: _id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project not found",
      });
    }

    console.log("project", project);

    if (project?.owner == email) {
      await Project.findByIdAndDelete({ _id: _id });
      res.status(200).json({
        success: true,
        message: "project deleted successfully",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "You don't have access to delete",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: "project Cannot be deleted successfully",
      error,
    });
  }
};
