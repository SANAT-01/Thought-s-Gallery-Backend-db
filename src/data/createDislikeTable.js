import pool from "../config/db.js";

const createDislikesTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS dislikes (
      user_id UUID NOT NULL,
      thought_id UUID NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (user_id, thought_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (thought_id) REFERENCES thoughts(id) ON DELETE CASCADE
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Dislikes table created successfully.");
  } catch (error) {
    console.error("Error creating dislikes table:", error);
  }
};

export default createDislikesTable;
