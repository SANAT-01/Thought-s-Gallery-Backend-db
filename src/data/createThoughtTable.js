import pool from "../config/db.js";

const createThoughtTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS thoughts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            content TEXT NOT NULL,
            likes INTEGER DEFAULT 0,
            dislikes INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(query);
        console.log('Thought table created successfully.');
    } catch (err) {
        console.error('Error creating thought table:', err);
    }
}; 
export default createThoughtTable;