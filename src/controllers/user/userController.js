const UserModel = require("../../modules/user/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");
/**
 * User Controller
 * @description Handles user-related HTTP requests
 * @author Mirako
 * @date 2024-09-07
 */
const UserController = {
  async registerUser(req, res) {
    try {
      const { username, password, email } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }
      const userResult = await UserModel.getUserByUsername(username);
      if (userResult) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.createUser({ username, hashedPassword, email });
      return res.status(201).json({ message: "Registration successful!" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  },

  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }
      const user = await UserModel.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // compare successful generate JWT
      const token = generateToken({ id: user.id, username: user.username });
      return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  },
};

module.exports = UserController;
