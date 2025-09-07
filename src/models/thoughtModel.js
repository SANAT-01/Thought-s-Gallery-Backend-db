import pool from "../config/db.js";

export const getThoughtsService = async (user_id) => {
    const values = [];
    let query = "";
    if (user_id) {
        query = "SELECT * FROM thoughts WHERE user_id = $1";
        values.push(user_id);
    } else {
        query = `
        SELECT
    t.id,
    t.content,
    t.user_id,
    t.created_at,
    u.username, -- Added username from the users table
    u.profile_picture, -- Also useful to grab the avatar URL
    -- Subquery to count likes for this specific thought
    (SELECT COUNT(*) FROM likes WHERE thought_id = t.id) AS likes,
    -- Subquery to count dislikes for this specific thought
    (SELECT COUNT(*) FROM dislikes WHERE thought_id = t.id) AS dislikes
    FROM
        thoughts t
    -- Join with the users table to get the author's details
    JOIN
        users u ON t.user_id = u.id
    ORDER BY
        t.created_at DESC;`;
    }

    const result = await pool.query(query, values);
    return result.rows;
};

export const getThoughtByIdService = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT t.id, t.content, t.user_id, t.created_at, u.username, u.profile_picture
        FROM thoughts t
        JOIN
            users u ON t.user_id = u.id
        WHERE t.id = $1`,
        [id]
    );
    return rows[0];
};

export const createThoughtService = async (thoughtData) => {
    const { user_id, content } = thoughtData;
    const { rows } = await pool.query(
        `WITH inserted_thought AS (
            -- Step 1: Insert the new thought and use RETURNING to capture it.
            INSERT INTO thoughts (user_id, content)
            VALUES ($1, $2)
            RETURNING *
        )
        -- Step 2: Select from the captured thought and join it with the users table.
        SELECT
            it.id,
            it.content,
            it.user_id,
            it.created_at,
            u.username,
            u.profile_picture
        FROM
            inserted_thought it
        JOIN
            users u ON it.user_id = u.id;`,
        [user_id, content]
    );
    return rows[0];
};

export const updateThoughtService = async (id, thoughtData) => {
    const { user_id, content } = thoughtData;
    const { rows } = await pool.query(
        "UPDATE thoughts SET user_id = $1, content = $2 WHERE id = $3 RETURNING *",
        [user_id, content, id]
    );
    return rows[0];
};
