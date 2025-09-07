const express = require("express");
const authenticateToken = require("../../middlewares/authenticateToken");
const { query } = require("../../db");
const { loadSql } = require("../../utils/sqlLoader");

const userQueries = loadSql("users.sql");

const router = express.Router();

/**
 * Get User Profile
 * @route GET api/profile/me
 * @description fetch current user's profile
 * @access Private
 * @author mirako
 */
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userResult = await query(userQueries.find_by_id, [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User data retrieved successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    release();
  }
});

module.exports = router;
