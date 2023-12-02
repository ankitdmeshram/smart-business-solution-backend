const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/signin", login);
module.exports = router;
