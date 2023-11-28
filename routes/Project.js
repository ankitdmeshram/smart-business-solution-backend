const express = require("express");
const router = express.Router();

const { createProject } = require("../controllers/projectControllers");

router.post("/createproject", createProject);

module.exports = router;
