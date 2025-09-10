const viewPostModel = require("../../modules/viewPost/viewPost");

const viewPostController = {
  async getPostCount(req, res) {
    try {
      const result = await viewPostModel.getPostCount();
      return res.status(200).json({
        message: "Posts count retrieved successfully",
        data: result.rows,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async getAllPosts(req, res) {
    try {
      const posts = await viewPostModel.getAllPosts();
      return res
        .status(200)
        .json({ message: "Posts retrieved successfully", data: posts });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async getPaginatedPosts(req, res) {
    try {
      if (!req.query || !req.query.page || !req.query.limit) {
        return res
          .status(400)
          .json({ error: "Page and limit parameters are required." });
      }

      let { page, limit } = req.query;
      page = Math.max(1, parseInt(page, 10) || 1);
      limit = Math.max(1, parseInt(limit, 10) || 1);

      const offset = (page - 1) * limit;

      const posts = await viewPostModel.getPaginatedPosts(limit, offset);

      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found." });
      }

      return res.status(200).json({
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async getPostById(req, res) {
    try {
      const postId = req.params.id;
      const post = await viewPostModel.getPostById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res
        .status(200)
        .json({ message: "Post retrieved successfully", data: post });
    } catch (error) {
      console.error("error occurred", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = viewPostController;
