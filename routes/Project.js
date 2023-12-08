const express = require("express");
const router = express.Router();

const {
  createProject,
  allProject,
  updateProject,
  viewProjectByAccess,
  deleteProject,
  viewProjectByID,
} = require("../controllers/projectControllers");

router.post("/createproject", createProject);

router.post("/allprojects", allProject);

router.post("/updateproject", updateProject);
router.post("/viewprojects", viewProjectByAccess);
router.post("/deleteprojects", deleteProject);
router.post("/viewprojectbyid", viewProjectByID);

module.exports = router;
