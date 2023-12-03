const express = require("express");
const router = express.Router();

const {
  allTask,
  createTask,
  viewTasksByPID,
} = require("../controllers/taskControllers");

router.post("/alltasks", allTask);
router.post("/createtask", createTask);
router.post("/viewtasksbypid", viewTasksByPID);

module.exports = router;
