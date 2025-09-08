const viewPostModel = require("../../modules/viewPost/viewPost");

/**
 * View Post Controller
 * @description Handles post-related HTTP requests
 * @author Mirako
 * @date 2024-09-07
 */
const viewPostController = {
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
