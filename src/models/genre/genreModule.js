const fs = require("fs");
const path = require("path");
const { query } = require("../../config/dbConfig");

const sqlPath               = path.join(__dirname, "../../sqls", "genre/");
const getAllGenresDir   = "getAllGenres.sql";
const getPostByGenreDir   = "getPostByGenre.sql";
const createGenreDir   = "createGenre.sql";

const genreModule = {
  async getAllGenres() {
    try {
      const sql = fs.readFileSync(sqlPath + getAllGenresDir, "utf8");
      const results = await query(sql);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async getPostByGenre(genreName, limit, offset) {
    const sql = fs.readFileSync(sqlPath + getPostByGenreDir, "utf8");
    const values = [genreName, limit, offset];
    try {
      const results = await query(sql, values);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async createGenre(genre_name, genre_slug, genre_description) {
    const sql = fs.readFileSync(sqlPath + createGenreDir, "utf8");
    const values = [genre_name, genre_slug, genre_description];
    try {
      const results = await query(sql, values);
      return results.rowCount;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = genreModule;
