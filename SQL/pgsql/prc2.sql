CREATE OR REPLACE FUNCTION get_word_details(search_word TEXT)
RETURNS TABLE(
    word_id INT,
    word TEXT,
    first_letter TEXT,
    last_letter TEXT,
    initial TEXT,
    topics TEXT,
    topic_codes TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        w.id AS word_id,
        w.word,
        w.first_letter,
        w.last_letter,
        w.initial,
        STRING_AGG(t.name, ', ') AS topics,
        STRING_AGG(t.code, ', ') AS topic_codes
    FROM
        words w
    LEFT JOIN
        word_topics wt ON w.id = wt.word_id
    LEFT JOIN
        topics t ON wt.topic_id = t.id
    WHERE
        w.word = search_word
    GROUP BY
        w.id, w.word, w.first_letter, w.last_letter, w.initial;
END;
$$ LANGUAGE plpgsql;
