const fs = require("fs");
const path = require("path");
const { query } = require("../../config/dbConfig");
const { log } = require("console");

const sqlPath               = path.join(__dirname, "../../sqls", "tag/");
const getAllTagsDir   = "getAllTags.sql";
const getPostByTagDir   = "getPostByTag.sql";
const createTagDir   = "createTag.sql";

const tagModule = {
  async getAllTags() {
    const sql = fs.readFileSync(sqlPath + getAllTagsDir, "utf8");
    try {
      const results = await query(sql);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async getPostByTag(tagName, limit, offset) {
    const sql = fs.readFileSync(sqlPath + getPostByTagDir, "utf8");
    const values = [tagName, limit, offset];
    try {
      const results = await query(sql, values);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async createTag(name, slug, description) {
    const sql = fs.readFileSync(sqlPath + createTagDir, "utf8");
    const values = [name, slug, description];
    try {
      const res = await query(sql, values);
      return res.rowCount;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = tagModule;
