import express from "express";
import {
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from "../controllers/userController.js";
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
import { validatePostComment } from "../middlewares/validateComment.js";
import {
    validatePostDislike,
    validatePostLike,
} from "../middlewares/validateLikeDislike.js";
import {
    getThoughtDislikes,
    getThoughtLikes,
    getUserDislikes,
    getUserLikes,
    postDislike,
    postLike,
} from "../controllers/likedislikeController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// GET
// user
router.get("/user", checkAuth, getUsers);
router.get("/user/:id", checkAuth, getUserById);
router.get("/user/:id/likes", checkAuth, getUserLikes);
router.get("/user/:id/dislikes", checkAuth, getUserDislikes);

// thoughts
router.get("/thoughts", checkAuth, getThoughts);
router.get("/thought/:id", checkAuth, getThoughtById);
router.get("/thought/:id/comments", checkAuth, getThoughtComments);
router.get("/thought/:id/likes", checkAuth, getThoughtLikes);
router.get("/thought/:id/dislikes", checkAuth, getThoughtDislikes);

// POST
// thoughts
router.post("/thought", checkAuth, validateThought, postThought);
router.post(
    "/thought/:id/comments",
    checkAuth,
    validatePostComment,
    postThoughtComments
);
// Likes and Dislikes
router.post("/thought/:id/like", checkAuth, validatePostLike, postLike);
router.post(
    "/thought/:id/dislike",
    checkAuth,
    validatePostDislike,
    postDislike
);

// PUT
// user/:id
router.put(
    "/user/:id",
    checkAuth,
    upload.single("profile_picture"),
    updateUser
);

// thoughts/:id
router.put("/thought/:id", checkAuth, validateThought, updateThought);

// DELETE
// user/:id
router.delete("/user/:id", checkAuth, deleteUser);

export default router;
