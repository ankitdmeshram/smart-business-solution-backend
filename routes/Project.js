const express = require("express");
const router = express.Router();

const {
  createProject,
  allProject,
} = require("../controllers/projectControllers");

router.post("/createproject", createProject);

router.post("/allprojects", allProject);

module.exports = router;
