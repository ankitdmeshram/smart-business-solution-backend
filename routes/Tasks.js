const express = require("express");
const router = express.Router();

const { allTask, createTask } = require("../controllers/taskControllers");

router.post("/alltasks", allTask);
router.post("/createtask", createTask);

module.exports = router;
