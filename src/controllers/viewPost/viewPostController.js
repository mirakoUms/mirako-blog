const viewPostModel = require('../../modules/viewPost/viewPost');

const viewPostController = {
    async getAllPosts(req, res) {
        try {
            const posts = await viewPostModel.getAllPosts();
            return res.status(200).json({ message: "Posts retrieved successfully", data: posts });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = viewPostController;