const { query } = require("../../config/dbConfig");

const genreModule = {
  async getPostByGenre(genreName, limit, offset) {
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
    const values = [genreName, limit, offset];
    try {
      const results = await query(sql, values);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },

  async getAllGenres() {
    try {
      const sql = `SELECT 
	            g.id AS genre_id, 
	            g.genre_name AS genre_name, 
	            COUNT(p.genre_id) AS post_count
            FROM 
              genres g
            LEFT JOIN 
              posts p ON g.id=p.genre_id
            GROUP BY 
              g.id`;
      const results = await query(sql);
      return results.rows;
    } catch (error) {
      throw error;
    }
  },

  async createGenre(name) {
    try {
      const sql = `INSERT INTO genres (genre_name, genre_slug, genre_describtion)
                  VALUES ($1, $2, $3)
                  ON CONFLICT (name) DO NOTHING`;
      const values = [name];
      const results = await query(sql, values);
      return results.rowCount;
    } catch (error) {
      throw error;
    } 
  }
};

module.exports = genreModule;
