import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUser } from "../middlewares/userValidate.js";
import { checkAuth } from "../util/auth.js";
import {
  getThoughtById,
  getThoughts,
  postThought,
  updateThought,
} from "../controllers/thoughtController.js";
import validateThought from "../middlewares/thoughtValidate.js";
import {
  getThoughtComments,
  postThoughtComments,
} from "../controllers/thoughtCommentController.js";
import { validate } from "uuid";
import { validatePostComment } from "../middlewares/validateComment.js";

const router = express.Router();

// GET
// user
router.get("/user", checkAuth, getUsers);
router.get("/user/:id", checkAuth, getUserById);
// thoughts
router.get("/thoughts", checkAuth, getThoughts);
router.get("/thought/:id", checkAuth, getThoughtById);
router.get("/thought/:id/comments", checkAuth, getThoughtComments);

// POST
// thoughts
router.post("/thought", checkAuth, validateThought, postThought);
router.post(
  "/thought/:id/comments",
  checkAuth,
  validatePostComment,
  postThoughtComments
);

// PUT
// user/:id
router.put("/user/:id", checkAuth, validateUpdateUser, updateUser);

// thoughts/:id
router.put("/thought/:id", checkAuth, validateThought, updateThought);

// DELETE
// user/:id
router.delete("/user/:id", checkAuth, deleteUser);

export default router;
