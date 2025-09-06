import pool from "../config/db.js";

const createFollowsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS follows (
      follower_id UUID NOT NULL,
      following_id UUID NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (follower_id, following_id),
      FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;
  try {
    await pool.query(queryText);
    console.log("Follows table created successfully.");
  } catch (error) {
    console.error("Error creating follows table:", error);
  }
};

export default createFollowsTable;
