import {
    getCommentsByThoughtIdService,
    postCommentToThoughtService,
} from "../models/thoughtCommentModel.js";
import handleResponse from "../util/response.js";

export const getThoughtComments = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { limit = 5, offset = 0 } = req.query; // Use default values

        const comments = await getCommentsByThoughtIdService(id, limit, offset);

        handleResponse(res, 200, comments, "Comments retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const postThoughtComments = async (req, res, next) => {
    try {
        // Logic to post a comment to a thought
        const { id: thoughtId } = req.params;
        const { content, userId } = req.body;
        // Call service to save comment
        const comments = await postCommentToThoughtService(
            thoughtId,
            userId,
            content
        );
        handleResponse(res, 201, comments, "Comment posted successfully");
    } catch (error) {
        next(error);
    }
};
