const express = require("express");
const router = express.Router();
const { register, login, myProfile } = require("./auth.controller");
const { authenticateToken } = require("./auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/my-profile", authenticateToken, myProfile);

module.exports = router;
