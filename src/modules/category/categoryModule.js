const { query } = require("../../config/dbConfig");

const categoryModule = {
  async getPostByCategory(categoryName, limit, offset) {
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
            WHERE c.name = $1
            GROUP BY
                p.id, u.username, c.name
            ORDER BY
                p.created_at DESC
            LIMIT $2 OFFSET $3`;
    const values = [categoryName, limit, offset];
    try {
      const results = await query(sql, values);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },

  async getAllCategory() {
    try {
      const sql = `SELECT 
	            c.id AS category_id, 
	            c.name AS category_name, 
	            COUNT(p.category_id) AS post_count
            FROM 
              categories c
            LEFT JOIN 
              posts p ON c.id=p.category_id
            GROUP BY 
              c.id`;
      const results = await query(sql);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },

  async createCategory(name) {
    try {
      const sql = `INSERT INTO categories (name)
                  VALUES ($1)
                  ON CONFLICT (name) DO NOTHING`;
      const values = [name];
      const results = await query(sql, values);
      return results.rowCount;
    } catch (error) {
      throw error;
    } 
  }
};

module.exports = categoryModule;
