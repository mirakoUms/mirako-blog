const { query } = require("../../config/dbConfig");

const changePostModel = {
  async createPost(user_id, title, summary, thumbnail_url) {
    const sql =
      "INSERT INTO posts (user_id, title, summary, thumbnail_url) VALUES ($1, $2, $3, $4)";
    const param = [user_id, title, summary, thumbnail_url];
    try {
      const results = await query(sql, param);
      return results;
    } catch (error) {
      throw error;
    }
  },
  async deletePost(delId) {
    // const sql = 'UPDATE posts SET deleted = '1' WHERE id IN ($1)';
    const sql = "DELETE FROM posts WHERE id IN ($1)";
    const values = [delId];
    try {
      const results = await query(sql, values);
      return results.rowCount;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = changePostModel;
