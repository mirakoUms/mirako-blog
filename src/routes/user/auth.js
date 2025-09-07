const express = require("express");
const bcrypt = require("bcrypt");
const UserController = require("../../controllers/user/userController");


const router = express.Router();

/**
 * User Registration
 * @route POST api/auth/register
 * @description User registration endpoint
 * @author mirako
 * @Date 2025-08-31
 */
router.post("/register", UserController.registerUser);

/**
 * User Login
 * @route POST api/auth/login
 * @description User login endpoint
 * @author mirako
 * @Date 2025-08-31
 */
router.post("/login", UserController.loginUser);

module.exports = router;
