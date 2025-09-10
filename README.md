const express = require('express');
const viewPostController = require('../../controllers/viewPost/viewPostController');

const router = express.Router();

/**
 * View Post
 * @description Routes for viewing posts
 * @route GET api/posts/all
 * @author Mirako
 * @date 2025-09-07
 */
router.get('/count', viewPostController.getPostCount);
router.get('/all', viewPostController.getAllPosts);
router.get('/', viewPostController.getAllPosts);
router.get('/:id', viewPostController.getPostById);
router.get('/:category', viewPostController.getPostByCategory)
router.get('/:tag', viewPostController.getPostByTag)

module.exports = router;







const viewPostModel = require("../../modules/viewPost/viewPost");

/**
 * View Post Controller
 * @description Handles post-related HTTP requests
 * @author Mirako
 * @date 2024-09-07
 */
const viewPostController = {
  async getPostCount(req, res) {
    try {
      const result = await viewPostModel.getPostCount();
      return res
        .status(200)
        .json({ message: "Page retrieved successfully", data: result });
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
      const { page, limit } = req.params;
      const offset = (page-1) * limit;
      const posts = await viewPostModel.getPaginatedPosts(limit, offset);
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
 async getPostByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const limit = req.params.limit;
      comst page = req.params.page;
      const offset = (page - 1) * limit;
      const posts = await viewPostModel.getPostByCategory(categoryId, limit, offset);
      return res
        .status(200)
        .json({ message: "Posts categorized as ${category} retrieved successfully", data: result });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async getPostByTag(req, res) {
    try {
      const tagId = req.params.tagId;
      const limit = req.params.limit;
      comst page = req.params.page;
      const offset = (page - 1) * limit;
      const posts = await viewPostModel.getPostByTag(tagId, limit, offset);
      return res
        .status(200)
        .json({ message: "Posts taged ${tag} retrieved successfully", data: result });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

};

module.exports = viewPostController;








const { query } = require("../../config/dbConfig");

/**
 * View Post Model
 * @description Model for post-related database operations
 * @author Mirako
 * @date 2025-09-07
 */
const viewPostModel = {
  async getPostCount() {
    const sql = 'select count(*) as page';
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
  }
  async getAllPosts() {
    const sql = `SELECT
                    p.id,
                    u.username,
                    p.title,
                    p.summary,
                    p.thumbnail_url,
                    c.name AS category_name,
                    STRING_AGG(t.name, ', ') AS tag_names,
                    p.status,
                    p.views_count,
                    p.likes_count,
                    p.comments_count,
                    p.is_featured,
                    p.created_at,
                    p.updated_at
                FROM
                    posts p
                LEFT JOIN 
                    users u ON p.user_id = u.id
                LEFT JOIN
                    categories c ON p.category_id = c.id
                LEFT JOIN
                    post_tags pt ON p.id = pt.post_id
                LEFT JOIN
                    tags t ON pt.tag_id = t.id
                GROUP BY
                    p.id, u.username, c.name
                ORDER BY
                    p.created_at DESC;`;
    try {
      const results = await query(sql);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async getPaginatedPosts(limit, offset) {
    const sql = `SELECT
                    p.id,
                    u.username,
                    p.title,
                    p.summary,
                    p.thumbnail_url,
                    c.name AS category_name,
                    STRING_AGG(t.name, ', ') AS tag_names,
                    p.status,
                    p.views_count,
                    p.likes_count,
                    p.comments_count,
                    p.is_featured,
                    p.created_at,
                    p.updated_at
                FROM
                    posts p
                LEFT JOIN 
                    users u ON p.user_id = u.id
                LEFT JOIN
                    categories c ON p.category_id = c.id
                LEFT JOIN
                    post_tags pt ON p.id = pt.post_id
                LEFT JOIN
                    tags t ON pt.tag_id = t.id
                GROUP BY
                    p.id, u.username, c.name
                ORDER BY
                    p.created_at DESC;
                LIMIT $1 OFFSET $2`;
    try {
      const results = await query(limit, offset);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async getPostById(postId) {
    const sql = `SELECT
                    p.id,
                    u.username,
                    p.title,
                    p.content,
                    p.summary,
                    p.thumbnail_url,
                    c.name AS category_name,
                    STRING_AGG(t.name, ', ') AS tag_names,
                    p.status,
                    p.views_count,
                    p.likes_count,
                    p.comments_count,
                    p.is_featured,
                    p.created_at,
                    p.updated_at
                FROM
                    posts p
                LEFT JOIN 
                    users u ON p.user_id = u.id
                LEFT JOIN
                    categories c ON p.category_id = c.id
                LEFT JOIN 
                    post_tags pt ON p.id = pt.post_id
                LEFT JOIN
                    tags t ON pt.tag_id = t.id
                WHERE
                    p.id = $1
                GROUP BY
                    p.id, u.username, c.name;`;
    const values = [postId];
    try {
      const results = await query(sql, values);
      return results.rows[0];
    } catch (error) {
      console.error("error occurred", error);
      throw error;
    }
  },
async getPostByCategory(categoryId, limit, offset) {
    const sql = `SELECT
                    p.id,
                    u.username,
                    p.title,
                    p.summary,
                    p.thumbnail_url,
                    c.name AS category_name,
                    STRING_AGG(t.name, ', ') AS tag_names,
                    p.status,
                    p.views_count,
                    p.likes_count,
                    p.comments_count,
                    p.is_featured,
                    p.created_at,
                    p.updated_at
                FROM
                    posts p
                LEFT JOIN 
                    users u ON p.user_id = u.id
                LEFT JOIN
                    categories c ON p.category_id = c.id
                LEFT JOIN
                    post_tags pt ON p.id = pt.post_id
                LEFT JOIN
                    tags t ON pt.tag_id = t.id
                WHERE p.categoryId = $1
                GROUP BY
                    p.id, u.username, c.name
                ORDER BY
                    p.created_at DESC
                LIMIT $2 OFFSET $3`;
    const values = [categoryId, limit, offset];
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
  },
  async getPostByTag(tagId, limit, offset) {
    const sql = `SELECT
                    p.id,
                    u.username,
                    p.title,
                    p.summary,
                    p.thumbnail_url,
                    c.name AS category_name,
                    STRING_AGG(t.name, ', ') AS tag_names,
                    p.status,
                    p.views_count,
                    p.likes_count,
                    p.comments_count,
                    p.is_featured,
                    p.created_at,
                    p.updated_at
                FROM
                    posts p
                LEFT JOIN 
                    users u ON p.user_id = u.id
                LEFT JOIN
                    categories c ON p.category_id = c.id
                LEFT JOIN
                    post_tags pt ON p.id = pt.post_id
                LEFT JOIN
                    tags t ON pt.tag_id = t.id
                WHERE pt.tagId = $1
                GROUP BY
                    p.id, u.username, c.name
                ORDER BY
                    p.created_at DESC
                LIMIT $2 OFFSET $3`;
    const values = [tagId, limit, offset];
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = viewPostModel;
