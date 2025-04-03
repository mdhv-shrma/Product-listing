const express = require("express");
const { signup, login, getUserInfo } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:id", getUserInfo);

module.exports = router;
