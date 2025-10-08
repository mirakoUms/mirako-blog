SELECT
    g.id AS genre_id,
    g.genre_name,
    g.genre_slug,
    g.genre_description,
    g.is_deleted,
    g.created_at,
    g.modified_at,
    COUNT(p.genre_id) AS post_count
FROM
    genres g
    LEFT JOIN posts p ON g.id = p.genre_id
GROUP BY
    g.id