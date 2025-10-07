const tagModule = require("../../models/tag/tagModule");

const tagController = {
  async getAllTags(req, res) {
    try {
      const tags = await tagModule.getAllTags();
      return res.status(200).json({
        message: "All posts retrieved successfully",
        data: tags,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async getPostByTag(req, res) {
    try {
      if (!req.query || !req.query.page || !req.query.limit) {
        return res
          .status(400)
          .json({ error: "Page and limit parameters are required." });
      }

      const tagId = req.params.tagId;

      let { page, limit } = req.query;
      page = Math.max(1, parseInt(page, 10) || 1);
      limit = Math.max(1, parseInt(limit, 10) || 1);

      const offset = (page - 1) * limit;

      const posts = await tagModule.getPostByTag(tagId, limit, offset);

      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found." });
      }

      return res.status(200).json({
        message: `Posts taged id: ${tagId} retrieved successfully`,
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async createTag(req, res) {
    try {
      const { name, slug, description } = req.body;
      if (!name || !slug || !description) {
        return res.status(400).json({ error: "Name, slug, description is required." });
      }
      const rowCount = await tagModule.createTag(name, slug, description);
      if (rowCount === 0) {
        return res.status(409).json({
          message: "Tag already exists.",
          data: rowCount,
        });
      }
      return res.status(201).json({
        message: "Tag created successfully.",
        data: rowCount,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = tagController;
