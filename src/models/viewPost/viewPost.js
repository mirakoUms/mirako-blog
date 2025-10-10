const fs = require("fs");
const path = require("path");
const { query } = require("../../config/dbConfig");

const sqlPath = path.join(__dirname, "../../sqls", "viewPost/");
const getAllPostSqlDir = "getAllPosts.sql";
const getPaginatedPostsDir = "getPaginatedPosts.sql";
const getPostByIDDir = "getPostByID.sql";
const getPostBySlugDir = "getPostBySlug.sql";

const viewPostModel = {
  async getPostCount() {
    const sql = "select count(*) as count from posts";
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
  },
  async getAllPosts() {
    const sql = fs.readFileSync(sqlPath + getAllPostSqlDir, "utf8");
    try {
      const results = await query(sql);
      return results.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async getPaginatedPosts(limit, offset) {
    const sql = fs.readFileSync(sqlPath + getPaginatedPostsDir, "utf8");
    const param = [limit, offset];
    try {
      const results = await query(sql, param);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async getPostById(postId) {
    const sql = fs.readFileSync(sqlPath + getPostByIDDir, "utf8");
    const values = [postId];
    try {
      const results = await query(sql, values);
      return results.rows[0];
    } catch (error) {
      console.error("error occurred", error);
      throw error;
    }
  },
  async getPostBySlug(postSlug) {
    const sql = fs.readFileSync(sqlPath + getPostBySlugDir, "utf8");
    const values = [postSlug];
    try {
      const results = await query(sql, values);
      return results.rows[0];
    } catch (error) {
      console.error("error occurred", error);
      throw error;
    }
  },
  async checkIfPostExists(postId) {
    const sql = "SELECT 1 FROM posts WHERE id = $1";
    const values = [postId];
    try {
      const results = await query(sql, values);
      return results.rows.length > 0;
    } catch (error) {
      console.error("error occurred", error);
      throw error;
    }
  },
};

module.exports = viewPostModel;
