INSERT INTO
    tags (tag_name, tag_slug, tag_description)
VALUES
    ($1, $2, $3) 
ON CONFLICT (tag_name) DO NOTHING