import express from "express";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import errorHandler from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import createThoughtTable from "./data/createThoughtTable.js";

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// Routes
app.use(authRoutes);
app.use("/api", userRoutes);

// Create the user table
createUserTable();
createThoughtTable();

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
