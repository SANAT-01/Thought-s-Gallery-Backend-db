const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("events");
  res.json({ message: "Events fetched." });
});

router.get("/users", async (req, res, next) => {
  console.log("events/users");
  res.json({ message: "Event users fetched." });
});

router.get("/:id", async (req, res, next) => {
  console.log("events/:id");
  res.json({ message: "Event fetched." });
});

// router.use(checkAuth);

router.post("/", async (req, res, next) => {
  const data = req.body;
  res.json({ message: "Event created.", event: data });
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;
  res.json({ message: "Event updated.", event: data });
  console.log("events/:id");
});

router.patch("/user/:id", async (req, res, next) => {
  console.log("events/user/:id");
  res.json({ message: "Event user updated.", user: req.body });
});

router.get("/fav", async (req, res, next) => {
   console.log("events/fav");
   res.json({ message: "Event favorites fetched." });
});

// router.post("/fav", async (req, res, next) => {
//    const data = req.body;
// });

// router.patch("/fav/:id", async (req, res, next) => {
//    const data = req.body;
// });

router.delete("/:id", async (req, res, next) => {
   console.log("events/:id");
   res.json({ message: "Event deleted." });
});

router.delete("users/:id", async (req, res, next) => {
   console.log("events/users/:id");
   res.json({ message: "Event user deleted." });
});

module.exports = router;
