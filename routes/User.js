const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  allUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/signin", login);
router.post("/alluser", allUser);
router.post("/deleteuser", deleteUser);
module.exports = router;
