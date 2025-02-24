const express = require("express");
const router = express.Router();
const { createCar, getCars, getCarById } = require("./car.controller");
const { authenticateToken } = require("../auth/auth.controller");
router.use(authenticateToken);

router.post("/", createCar); 
router.get("/", getCars);
router.get("/:id", getCarById);

module.exports = router;
