import pool from "../config/db.js";

export const getThoughtsService = async (user_id) => {
    const values = [];
    let query = `
    SELECT
        t.id,
        t.content,
        t.user_id,
        t.created_at,
        u.username,
        u.profile_picture,
        -- Get a JSON array of all liked users' details
        (SELECT COALESCE(
            json_agg(json_build_object('id', lu.id, 'username', lu.username, 'profile_picture', lu.profile_picture)),
            '[]'
        )
        FROM likes l
        JOIN users lu ON l.user_id = lu.id
        WHERE l.thought_id = t.id) AS liked_by_users,
        
        -- Get a JSON array of all disliked users' details
        (SELECT COALESCE(
            json_agg(json_build_object('id', du.id, 'username', du.username, 'profile_picture', du.profile_picture)),
            '[]'
        )
        FROM dislikes d
        JOIN users du ON d.user_id = du.id
        WHERE d.thought_id = t.id) AS disliked_by_users,
        
        -- Get a JSON array of all comments for the thought, with user details
        (SELECT COALESCE(
            json_agg(json_build_object(
                'id', c.id, 
                'content', c.content, 
                'created_at', c.created_at,
                'user', json_build_object('id', cu.id, 'username', cu.username, 'profile_picture', cu.profile_picture)
            ) ORDER BY c.created_at DESC),
            '[]'
        )
        FROM comments c
        JOIN users cu ON c.user_id = cu.id
        WHERE c.thought_id = t.id) AS comments

    FROM
        thoughts t
    JOIN
        users u ON t.user_id = u.id
    `;

    // Add a WHERE clause to filter by user if requested
    if (user_id) {
        query += " WHERE t.user_id = $1";
        values.push(user_id);
    }

    query += ` ORDER BY t.created_at DESC;`;

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
