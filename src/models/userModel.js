import pool from '../config/db.js';

// Get all users
export const getAllUsersService = async () => {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
}

// Get a particular user by ID
export const getUserByIdService = async (id) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
}

// Update a user by ID
export const updateUserService = async (id, user) => {
    const { username, email, password } = user;
    const { rows } = await pool.query(
        'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
        [username, email, password, id]
    );
    return rows[0];
}

// Delete a user by ID
export const deleteUserService = async (id) => {
    const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return rowCount > 0;
}
