const express = require("express");
const authenticateToken = require("../../middlewares/authenticateToken");
const UserController = require("../../controllers/user/userController");

const router = express.Router();

/**
 * Get User Profile
 * @route GET api/me
 * @description fetch current user's profile
 * @author mirako
 * @date 2025-09-07
 */
router.get("/", authenticateToken, UserController.getUserProfile);

module.exports = router;
