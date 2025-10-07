const UserModel = require("../../models/user/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");

const UserController = {
  async registerUser(req, res) {
    try {
      const { username, slug, password, email } = req.body;
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
      await UserModel.createUser({ username, slug, hashedPassword, email });
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
        return res.status(401).json({ message: "Unmatched credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Unmatched credentials" });
      }
      // compare successful generate JWT
      const token = generateToken({ id: user.id, username: user.username });
      return res.status(200).json({ message: "Login successful", token, userId: user.id });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  },

  async getUserProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }
};

module.exports = UserController;
