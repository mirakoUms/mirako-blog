const changePostModel = require("../../models/changePost/changePost");

const changePostController = {
  async createPost(req, res) {
    try {
      const user_id = req.user.id;
      const { title, summary, thumbnail_url } = req.body;
      const result = await changePostModel.createPost(
        user_id,
        title,
        summary,
        thumbnail_url
      );
      return res.status(200).json({
        message: "Posts created successfully",
        data: result.rowCount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async deletePost(req, res) {
    try {
      const id = req.params.id;
      const result = await changePostModel.deletePost(id);
      if (result === 0)
        return res.status(404).json({
          message: "Post delete failed: no such post exist.",
          rowCount: result,
        });
      return res.status(200).json({
        message: "Posts deleted successfully",
        rowCount: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async editInfo(req, res) {
    try {
      const id = req.params.id;
      const { title, summary, category_id, thumbnail_url } = req.body;
      const result = await changePostModel.editInfo(
        title,
        summary,
        category_id,
        thumbnail_url,
        id
      );
      return res
        .status(200)
        .json({ message: "Post Info edited successfully", data: result });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error", errorInfo: error });
    }
  },
  async save(req, res) {
    try {
      const id = req.params.id;
      const content = req.body.content;
      const result = await changePostModel.save(content, id);
      return res
        .status(200)
        .json({ message: "Post content saved successfully", data: result });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = changePostController;
