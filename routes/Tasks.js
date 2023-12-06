const express = require("express");
const router = express.Router();

const {
  allTask,
  createTask,
  viewTasksByPID,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

router.post("/alltasks", allTask);
router.post("/createtask", createTask);
router.post("/viewtasksbypid", viewTasksByPID);
router.post("/updatetask", updateTask);
router.post("/deletetask", deleteTask);

module.exports = router;
