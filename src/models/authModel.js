import pool from '../config/db.js';
import { compare, hash } from "bcryptjs";
import { v4 as generateId } from "uuid";
import { isValidPassword } from '../util/auth.js';

// Get a particular user by ID
export const signInUserService = async (email, password) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (user && await isValidPassword(password, user.password)) {
        return user;
    }
    throw new Error('Invalid email or password');
}

// Create a new user
export const createUserService = async (user) => {
    const { username, email, password } = user;
    const userId = generateId();
    const hashedPw = await hash(password, 12);
    try {
        const { rows } = await pool.query(
            'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, username, email, hashedPw]
        );
        return rows[0];
    } catch (err) {
        // Rethrow with proper statusCode for duplicate entries
        if (err.code === "23505") {  // PostgreSQL unique violation
        const error = new Error("Username or email already exists.");
        error.statusCode = 400;
        throw error; // Pass to controller -> errorHandler
        }
        throw err; // Pass other errors up
    }
}