const express = require("express");
const authenticateToken = require("../../middlewares/authenticateToken");
const UserController = require("../../controllers/user/userController");

const router = express.Router();

/**
 * Post User Profile
 * @route Post api/me
 * @description fetch current user's profile
 * @author mirako
 * @date 2025-09-07
 */
router.get("/", authenticateToken, UserController.getUserProfile);

module.exports = router;
