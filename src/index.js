const bodyParser = require("body-parser");
const express = require("express");

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const fabs = require("./routes/fav"); 
const app = express();
const port = 3000;

// Parse JSON body
app.use(express.json());
// Parse form-urlencoded body (optional, if you use forms)
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(authRoutes);
app.use("/fav", fabs);
app.use("/events", eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(port);
