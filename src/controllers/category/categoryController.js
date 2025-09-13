const categoryModule = require("../../modules/category/categoryModule");

const CategoryController = {
  async getPostByCategory(req, res) {
    try {
      if (!req.query || !req.query.page || !req.query.limit) {
        return res
          .status(400)
          .json({ error: "Page and limit parameters are required." });
      }

      const categoryName = req.params.categoryName;

      let { page, limit } = req.query;
      page = Math.max(1, parseInt(page, 10) || 1);
      limit = Math.max(1, parseInt(limit, 10) || 1);

      const offset = (page - 1) * limit;

      const posts = await categoryModule.getPostByCategory(categoryName, limit, offset);

      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found." });
      }
      
      return res.status(200).json({
        message: `Posts categorized as ${categoryName} retrieved successfully`,
        data: posts
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = CategoryController;
