const express = require("express");
const router = express.Router();

const {
  generateLandingPage,
  allLandingPages,
  updateLandingPage,
  deleteLandingPage,
} = require("../controllers/landingPageControllers");

router.post("/allpages", allLandingPages);
router.post("/generate", generateLandingPage);
router.post("/update", updateLandingPage);
router.post("/delete", deleteLandingPage);

module.exports = router;
