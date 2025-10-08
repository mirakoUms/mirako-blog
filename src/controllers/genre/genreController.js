const e = require("express");
const genreModule = require("../../models/genre/genreModule");

const genreController = {
  async getPostBygenre(req, res) {
    try {
      if (!req.query || !req.query.page || !req.query.limit) {
        return res
          .status(400)
          .json({ error: "Page and limit parameters are required." });
      }

      const genreName = req.params.genreName;

      let { page, limit } = req.query;
      page = Math.max(1, parseInt(page, 10) || 1);
      limit = Math.max(1, parseInt(limit, 10) || 1);

      const offset = (page - 1) * limit;

      const posts = await genreModule.getPostByGenre(
        genreName,
        limit,
        offset
      );

      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found." });
      }

      return res.status(200).json({
        message: `Posts categorized as ${genreName} retrieved successfully`,
        data: posts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async getAllgenre(req, res) {
    try {
      const genres = await genreModule.getAllGenres();
      return res.status(200).json({
        message: `genres retrieved successfully`,
        data: genres,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async creategenre(req, res) {
    try {
      const { genre_name, genre_slug, genre_description } = req.body;

      if (!genre_name || !genre_slug || !genre_description) {
        return res.status(400).json({ error: "Name is required." });
      }

      const rowCount = await genreModule.createGenre(genre_name, genre_slug, genre_description);

      if (rowCount === 0) {
        return res.status(409).json({
          message: "Create genre failed. genre may already exist.",
          data: rowCount,
        });
      }

      return res.status(201).json({
        message: "genre created successfully",
        data: rowCount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
}

module.exports = genreController;
