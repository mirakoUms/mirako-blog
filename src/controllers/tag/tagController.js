const tagModule = require("../../modules/tag/tagModule");

const tagController = {
  async getPostByTag(req, res) {
    try {
      if (!req.query || !req.query.page || !req.query.limit) {
        return res
          .status(400)
          .json({ error: "Page and limit parameters are required." });
      }

      const tagName = req.params.tagName;

      let { page, limit } = req.query;
      page = Math.max(1, parseInt(page, 10) || 1);
      limit = Math.max(1, parseInt(limit, 10) || 1);

      const offset = (page - 1) * limit;
     
      const posts = await tagModule.getPostByTag(tagName, limit, offset);
      return res.status(200).json({
        message: `Posts taged ${ tagName } retrieved successfully`,
        data: posts,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = tagController;
