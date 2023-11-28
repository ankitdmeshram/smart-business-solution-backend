const express = require("express");
const router = express.Router();

const {
  createProject,
  allProject,
  updateProduct,
} = require("../controllers/projectControllers");

router.post("/createproject", createProject);

router.post("/allprojects", allProject);

router.post("/updateproject", updateProduct);

module.exports = router;
