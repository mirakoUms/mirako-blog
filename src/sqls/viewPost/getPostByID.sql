SELECT
    p.id,
    a.username,
    p.title,
    p.summary,
    p.content,
    p.thumbnail_url,
    g.genre_name,
    COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'id',
                t.id,
                'tag_name',
                t.tag_name,
                'tag_slug',
                t.tag_slug,
                'tag_description',
                t.tag_description
            )
        ) FILTER (
            WHERE
                t.id IS NOT NULL
        ),
        '[]'
    ) AS tags,
    p.status,
    p.views_count,
    p.likes_count,
    p.comments_count,
    p.is_featured,
    p.published_at,
    p.modified_at
FROM
    posts p
    LEFT JOIN admins a ON p.admin_id = a.id
    LEFT JOIN genres g ON p.genre_id = g.id
    LEFT JOIN post_tags pt ON p.id = pt.post_id
    LEFT JOIN tags t ON pt.tag_id = t.id
WHERE
    p.id = $1
GROUP BY
    p.id,
    a.username,
    g.genre_name;