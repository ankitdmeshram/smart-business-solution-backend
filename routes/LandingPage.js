const express = require("express");
const router = express.Router();

const {
  generateLandingPage,
  allLandingPages,
  updateLandingPage,
  deleteLandingPage,
  viewLandingPage,
} = require("../controllers/landingPageControllers");

router.post("/allpages", allLandingPages);
router.post("/generate", generateLandingPage);
router.post("/update", updateLandingPage);
router.post("/delete", deleteLandingPage);
router.post("/viewlandingpage", viewLandingPage);

module.exports = router;
