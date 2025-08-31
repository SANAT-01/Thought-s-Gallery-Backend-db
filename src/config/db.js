import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'your_db_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'your_db_name',
    password: process.env.DB_PASSWORD || 'your_db_password',
    port: process.env.DB_PORT || 5432,
    max: 20, // max number of clients in the pool
    idleTimeoutMillis: 30000, // close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection could not be established
});

pool.on("connect", () => {
    console.log("Connecting to the database");
});

export default pool;