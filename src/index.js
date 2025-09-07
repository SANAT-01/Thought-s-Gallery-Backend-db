import express from "express";
import pool from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import createThoughtTable from "./data/createThoughtTable.js";
import createFollowsTable from "./data/createFollowTable.js";
import createCommentsTable from "./data/createCommentTable.js";
import createLikesTable from "./data/createLikeTable.js";
import createDislikesTable from "./data/createDislikeTable.js";

const app = express();
const port = 5173;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    // Allow frontend (Next.js at 3000) to call backend (5173)
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Allow all needed HTTP methods
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    // Allow headers
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Routes
app.use(authRoutes);
app.use("/api", apiRoutes);

// --- Database Initialization ---
// This async function ensures tables are created in the correct order
const initializeDatabase = async () => {
    try {
        console.log("Initializing database...");
        await createUserTable();
        await createThoughtTable(); // Depends on users
        await createFollowsTable(); // Depends on users
        await createCommentsTable(); // Depends on users and thoughts
        await createLikesTable(); // Depends on users and thoughts
        await createDislikesTable(); // Depends on users and thoughts
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize database:", error);
        // Exit the process if the database setup fails, as the app cannot run.
        process.exit(1);
    }
};

// Test PostgreSQL connection
app.get("/postgres", async (req, res) => {
    try {
        const result = await pool.query("SELECT CURRENT_DATABASE()");
        res.json({ database: result.rows[0].current_database });
    } catch (error) {
        console.error("Error fetching database name:", error);
        res.status(500).json({ message: "Error fetching database name." });
    }
});

// Error handling (after routes)
app.use(errorHandler);

app.listen(port, async () => {
    await initializeDatabase();
    console.log(`Server is running on http://localhost:${port}`);
});
