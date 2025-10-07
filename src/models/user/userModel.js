const { query } = require("../../config/dbConfig");

/**
 * User Model
 * @description Model for user-related database operations
 * @author Mirako
 * @date 2025-09-07
 */
const UserModel = {
  async getUserById(id) {
    const sql = "SELECT u.id, u.username, u.slug, u.email FROM admins u WHERE u.id = $1";
    try {
      const result = await query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error fetching user by ID");
    }
  },

  async getUserByUsername(username) {
    const sql =
      "SELECT u.id, u.username, u.password, u.email FROM admins u WHERE u.username = $1";
    try {
      const result = await query(sql, [username]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error fetching user by username");
    }
  },
  async createUser({ username, slug, hashedPassword, email }) {
    const sql =
      "INSERT INTO admins (username, slug, password, email) VALUES ($1, $2, $3, $4)";
    try {
      const result = await query(sql, [username, slug, hashedPassword, email]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Error creating user");
    }
  },
};

module.exports = UserModel;
