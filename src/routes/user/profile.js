const express = require("express");
const authenticateToken = require("../../middlewares/authenticateToken");
const UserController = require("../../controllers/user/userController");

const router = express.Router();

router.get("/", authenticateToken, UserController.getUserProfile);

module.exports = router;
