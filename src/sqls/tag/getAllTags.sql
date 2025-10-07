SELECT
    t.id as tag_id,
    t.tag_name, 
    t.tag_slug, 
    t.tag_description ,
    t.is_deleted ,
    t.created_at ,
    t.modified_at ,
    COUNT(pt.post_id) AS post_count
FROM
    tags t
    LEFT JOIN post_tags pt ON t.id = pt.tag_id
GROUP BY
    t.id
HAVING
    COUNT(pt.post_id) <> 0