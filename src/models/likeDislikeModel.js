import pool from "../config/db.js";

export const postLikeService = async (thoughtId, userId) => {
    console.log(thoughtId, userId);
    const { rows } = await pool.query(
        "INSERT INTO likes (thought_id, user_id) VALUES ($1, $2) RETURNING *",
        [thoughtId, userId]
    );
    return rows[0];
};

export const postDislikeService = async (thoughtId, userId) => {
    console.log(thoughtId, userId);
    const { rows } = await pool.query(
        "INSERT INTO dislikes (thought_id, user_id) VALUES ($1, $2) RETURNING *",
        [thoughtId, userId]
    );
    return rows[0];
};

export const getLikesByThoughtIdService = async (thoughtId) => {
    const { rows } = await pool.query(
        "SELECT * FROM likes WHERE thought_id = $1",
        [thoughtId]
    );
    return rows;
};

export const getDislikesByThoughtIdService = async (thoughtId) => {
    const { rows } = await pool.query(
        "SELECT * FROM dislikes WHERE thought_id = $1",
        [thoughtId]
    );
    return rows;
};

export const removeLikeService = async (thoughtId, userId) => {
    const { rows } = await pool.query(
        "DELETE FROM likes WHERE thought_id = $1 AND user_id = $2 RETURNING *",
        [thoughtId, userId]
    );
    return rows[0];
};

export const removeDislikeService = async (thoughtId, userId) => {
    const { rows } = await pool.query(
        "DELETE FROM dislikes WHERE thought_id = $1 AND user_id = $2 RETURNING *",
        [thoughtId, userId]
    );
    return rows[0];
};

export const checkExistingLike = async (thoughtId, userId) => {
    const { rows } = await pool.query(
        `SELECT * FROM likes WHERE thought_id = $1 AND user_id = $2`,
        [thoughtId, userId]
    );
    return rows[0];
};

export const checkExistingDislike = async (thoughtId, userId) => {
    const { rows } = await pool.query(
        "SELECT * FROM dislikes WHERE thought_id = $1 AND user_id = $2",
        [thoughtId, userId]
    );
    return rows[0];
};

export const getuserLikesService = async (userId) => {
    const { rows } = await pool.query(
        `SELECT
        t.id AS thought_id,
        t.content,
        t.user_id AS author_id,
        l.user_id AS disliker_id -- You can select specific columns for clarity
    FROM
        thoughts t
    JOIN
        likes l ON t.id = l.thought_id
    WHERE
        -- Corrected line:
        t.user_id = $1;`,
        [userId]
    );
    return rows;
};

export const getuserDislikesService = async (userId) => {
    const { rows } = await pool.query(
        `SELECT
        t.id AS thought_id,
        t.content,
        t.user_id AS author_id,
        l.user_id AS disliker_id -- You can select specific columns for clarity
    FROM
        thoughts t
    JOIN
        dislikes l ON t.id = l.thought_id
    WHERE
        -- Corrected line:
        t.user_id = $1;`,
        [userId]
    );
    return rows;
};

export const getLikesService = async () => {
    const { rows } = await pool.query("SELECT * FROM likes");
    return rows;
};

export const getDislikesService = async () => {
    const { rows } = await pool.query("SELECT * FROM dislikes");
    return rows;
};
