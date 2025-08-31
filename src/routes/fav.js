import express from "express";

const router = express.Router();

// router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log("GET /fav");
  res.json({ message: "Favorites fetched." });
});

router.post("/", async (req, res, next) => {
  console.log("POST /fav");
  res.json({ message: "Favorite added." });
});

router.patch("/:id", async (req, res, next) => {
  console.log("PATCH /fav/:id");
  res.json({ message: "Favorite updated." });
});

export default router;
