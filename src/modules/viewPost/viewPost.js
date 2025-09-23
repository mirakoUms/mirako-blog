const { query } = require("../../config/dbConfig");

/**
 * View Post Model
 * @description Model for post-related database operations
 * @author Mirako
 * @date 2025-09-07
 */
const viewPostModel = {
  async getPostCount() {
    const sql = "select count(*) as count from posts";
    try {
      const results = await query(sql);
      return results;
    } catch (error) {
      throw error;
    }
  },
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
                 p.created_at DESC
             LIMIT $1 OFFSET $2`;
    const param = [limit, offset]
    try {
      const results = await query(sql, param);
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
  async checkIfPostExists(postId) {
    const sql = "SELECT 1 FROM posts WHERE id = $1";
    const values = [postId];
    try {
      const results = await query(sql, values);
      return results.rows.length > 0;
    } catch (error) {
      console.error("error occurred", error);
      throw error;
    }
  }
};

module.exports = viewPostModel;
