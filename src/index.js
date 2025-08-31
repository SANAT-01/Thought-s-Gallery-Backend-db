import express from "express";
import bodyParser from "body-parser";
import eventRoutes from "./routes/events.js";
import authRoutes from "./routes/auth.js";
import fabs from "./routes/fav.js";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

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

app.use(errorHandler);

// Routes
app.use("/api", userRoutes);
app.use(authRoutes);
app.use("/fav", fabs);
app.use("/events", eventRoutes);

// Create the user table
createUserTable();

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
