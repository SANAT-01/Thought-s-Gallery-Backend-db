import pool from "../config/db.js";

export const getCommentsByThoughtIdService = async (
    thoughtId,
    limit,
    offset
) => {
    // Add OFFSET and LIMIT clauses to the query
    const { rows } = await pool.query(
        `
        SELECT
            c.*,
            json_build_object(
                'id', u.id,
                'username', u.username,
                'profile_picture', u.profile_picture
            ) AS user
        FROM
            comments c
        JOIN
            users u ON c.user_id = u.id
        WHERE
            thought_id = $1
        ORDER BY
            c.created_at DESC
        LIMIT $2 OFFSET $3;`, // Use placeholders for limit and offset
        [thoughtId, limit, offset] // Pass the parameters to the query
    );
    return rows;
};

export const postCommentToThoughtService = async (
    thoughtId,
    userId,
    content
) => {
    const { rows } = await pool.query(
        `INSERT INTO comments (thought_id, user_id, content)
        VALUES ($1, $2, $3)
        RETURNING
            comments.*,
            (
                SELECT row_to_json(u)
                FROM (
                    SELECT id, username, profile_picture
                    FROM users
                    WHERE id = $2
                ) u
            ) AS user;`,
        [thoughtId, userId, content]
    );
    return rows[0];
};
