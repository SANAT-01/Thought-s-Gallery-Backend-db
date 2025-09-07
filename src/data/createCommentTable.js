import pool from "../config/db.js";

const createCommentsTable = async () => {
  const queryText = `
      CREATE TABLE IF NOT EXISTS comments (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          content VARCHAR(280) NOT NULL,
          user_id UUID NOT NULL,
          thought_id UUID NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
          FOREIGN KEY (thought_id) REFERENCES thoughts(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
  `;
  try {
    await pool.query(queryText);
    console.log("Comments table created successfully.");
  } catch (error) {
    console.error("Error creating comments table:", error);
  }
};

export default createCommentsTable;
