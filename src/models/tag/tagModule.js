const { query } = require("../../config/dbConfig");

const tagModule = {
  async getAllPostsByTag() {
    const sql = `SELECT
                  t.id as tag_id,
                  t.name AS tag_name,
                  COUNT(pt.post_id) AS post_count
                FROM
                  tags t
                LEFT JOIN
                  post_tags pt ON t.id = pt.tag_id
                GROUP BY
                  t.id
                HAVING COUNT(pt.post_id) <> 0`;
    try {
      const results = await query(sql);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async getPostByTag(tagName, limit, offset) {
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
            WHERE t.name = $1
            GROUP BY
                p.id, u.username, c.name
            ORDER BY
                p.created_at DESC
            LIMIT $2 OFFSET $3`;
    const values = [tagName, limit, offset];
    try {
      const results = await query(sql, values);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },
  async createTag(name) {
    const insertSql = `INSERT INTO tags (name)
                      VALUES ($1)
                      ON CONFLICT (name) DO NOTHING`;
    try {
      const res = await query(insertSql, [name]);
      return res.rowCount;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = tagModule;
