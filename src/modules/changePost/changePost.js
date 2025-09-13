const e = require("express");
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
  async editInfo(title, summary, category_id, thumbnail_url, id) {
    const sql =
      "UPDATE posts SET title=$1, summary=$2, category_id=$3, thumbnail_url=$4 WHERE id=$5";
    const values = [title, summary, category_id, thumbnail_url, id];
    try {
      const results = await query(sql, values);
      return results.rowCount;
    } catch (error) {
      throw error;
    }
  },
  async save(content, id) {
    const sql =
      "UPDATE posts SET content = $1 Where id = $2 AND content IS DISTINCT FROM $1";
    const values = [content, id];
    try {
      const results = await query(sql, values);
      return results.rowCount;
    } catch (error) {
        console.log(error)
      throw error;
    }
  },
};

module.exports = changePostModel;
