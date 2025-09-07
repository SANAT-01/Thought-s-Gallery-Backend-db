import pool from "../config/db.js";

// Get all users
export const getAllUsersService = async () => {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
};

// Get a particular user by ID
export const getUserByIdService = async (id) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
    ]);
    return rows[0];
};

// Update a user by ID
export const updateUserService = async (id, user) => {
    const { username, profile_picture } = user;
    const { rows } = await pool.query(
        "UPDATE users SET username = $1, profile_picture = $2 WHERE id = $3 RETURNING *",
        [username, profile_picture, id]
    );
    return rows[0];
};

// Delete a user by ID
export const deleteUserService = async (id) => {
    const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
        id,
    ]);
    return rowCount > 0;
};
