import pool from "../config/db.js";

export const getCommentsByThoughtIdService = async (thoughtId) => {
    const { rows } = await pool.query(
        `
        SELECT c.*, u.username, u.profile_picture
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE thought_id = $1`,
        [thoughtId]
    );
    return rows;
};

export const postCommentToThoughtService = async (
    thoughtId,
    userId,
    content
) => {
    console.log(thoughtId, userId, content);
    const { rows } = await pool.query(
        "INSERT INTO comments (thought_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
        [thoughtId, userId, content]
    );
    return rows[0];
};
