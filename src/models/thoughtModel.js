import pool from "../config/db.js";

export const getThoughtsService = async (user_id) => {
  let query = "SELECT * FROM thoughts";
  const values = [];

  if (user_id) {
    query += " WHERE user_id = $1";
    values.push(user_id);
  }

  const result = await pool.query(query, values);
  return result.rows;
};

export const getThoughtByIdService = async (id) => {
  const { rows } = await pool.query("SELECT * FROM thoughts WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

export const createThoughtService = async (thoughtData) => {
  const { user_id, content } = thoughtData;
  const { rows } = await pool.query(
    "INSERT INTO thoughts (user_id, content) VALUES ($1, $2) RETURNING *",
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
