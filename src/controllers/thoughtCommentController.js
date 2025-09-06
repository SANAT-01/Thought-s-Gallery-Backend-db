import { getCommentsByThoughtIdService, postCommentToThoughtService } from "../models/thoughtCommentModel.js";
import handleResponse from "../util/response.js";

export const getThoughtComments = async (req, res, next) => {
    try {
        const comments = await getCommentsByThoughtIdService(req.params.id);
        handleResponse(res, 200, comments, 'Comments retrieved successfully');
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
        const comments = await postCommentToThoughtService(thoughtId, userId, content);
        handleResponse(res, 201, comments, "Comment posted successfully");
    } catch (error) {
        next(error);
    }
};