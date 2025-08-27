const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  console.log(data)
  res
      .status(201)
      .json({ message: "User created." });
});

router.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data)
  res
      .status(200)
      .json({ message: "User logged in" });
});

module.exports = router;
