INSERT INTO
    genres (genre_name, genre_slug, genre_description)
VALUES
    ($1, $2, $3) ON CONFLICT (genre_name) DO NOTHING