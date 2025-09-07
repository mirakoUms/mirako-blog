const { query } = require("../../config/dbConfig");
const UserModel = {
  async getUserById(id) {
    const sql = "SELECT u.id, u.username, u.email FROM users u WHERE u.id = $1";
    try {
      const result = await query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error fetching user by ID");
    }
  },

  async getUserByUsername(username) {
    const sql =
      "SELECT u.username, u.password, u.email FROM users u WHERE u.username = $1";
    try {
      const result = await query(sql, [username]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error fetching user by username");
    }
  },
  async createUser({ username, hashedPassword, email }) {
    const sql =
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";
    try {
      const result = await query(sql, [username, hashedPassword, email]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error creating user");
    }
  },
};

module.exports = UserModel;
