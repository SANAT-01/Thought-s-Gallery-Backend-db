import {
    checkExistingDislike,
    checkExistingLike,
    getDislikesByThoughtIdService,
    getLikesByThoughtIdService,
    getuserDislikesService,
    getuserLikesService,
    postDislikeService,
    postLikeService,
    removeDislikeService,
    removeLikeService,
} from "../models/likeDislikeModel.js";
import handleResponse from "../util/response.js";

export const postLike = async (req, res, next) => {
    try {
        const { id: thoughtId } = req.params;
        const { userId } = req.body;
        const existingLike = await checkExistingLike(thoughtId, userId);
        if (existingLike) {
            await removeLikeService(thoughtId, userId);
            handleResponse(
                res,
                200,
                existingLike,
                "Thought unliked successfully"
            );
        } else {
            await removeDislikeService(thoughtId, userId); // Remove dislike if exists
            const like = await postLikeService(thoughtId, userId);
            handleResponse(res, 201, like, "Thought liked successfully");
        }
    } catch (error) {
        next(error);
    }
};

export const postDislike = async (req, res, next) => {
    try {
        const { id: thoughtId } = req.params;
        const { userId } = req.body;
        const existingDislike = await checkExistingDislike(thoughtId, userId);
        if (existingDislike) {
            await removeDislikeService(thoughtId, userId); // Remove dislike if exists
            handleResponse(
                res,
                201,
                existingDislike,
                "Thought undisliked successfully"
            );
        } else {
            await removeLikeService(thoughtId, userId); // Remove like if exists
            const dislike = await postDislikeService(thoughtId, userId);
            handleResponse(res, 201, dislike, "Thought disliked successfully");
        }
    } catch (error) {
        next(error);
    }
};

export const getThoughtLikes = async (req, res, next) => {
    try {
        const { id: thoughtId } = req.params;
        const likes = await getLikesByThoughtIdService(thoughtId);
        handleResponse(res, 200, likes, "Likes fetched successfully");
    } catch (error) {
        next(error);
    }
};

export const getThoughtDislikes = async (req, res, next) => {
    try {
        const { id: thoughtId } = req.params;
        const dislikes = await getDislikesByThoughtIdService(thoughtId);
        handleResponse(res, 200, dislikes, "Dislikes fetched successfully");
    } catch (error) {
        next(error);
    }
};

export const getUserLikes = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        const userLikes = await getuserLikesService(userId);
        handleResponse(res, 200, userLikes, "User Likes fetched successfully");
    } catch (error) {
        next(error);
    }
};

export const getUserDislikes = async (req, res, next) => {
    try {
        const { id: userId } = req.params;
        const userLikes = await getuserDislikesService(userId);
        handleResponse(
            res,
            200,
            userLikes,
            "User Dislikes fetched successfully"
        );
    } catch (error) {
        next(error);
    }
};
