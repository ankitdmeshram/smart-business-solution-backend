const express = require("express");
const router = express.Router();

const {
  generateLandingPage,
} = require("../controllers/landingPageControllers");

router.post("/generate", generateLandingPage);

module.exports = router;
