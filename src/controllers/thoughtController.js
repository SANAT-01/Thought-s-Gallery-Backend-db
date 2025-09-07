import { createThoughtService, getThoughtByIdService, getThoughtsService, updateThoughtService } from "../models/thoughtModel.js";
import handleResponse from "../util/response.js";

// Get thoughts
export const getThoughts = async (req, res, next) => {
    try {
        const { user_id } = req.query;
        const thoughts = await getThoughtsService(user_id);
        handleResponse(res, 200, thoughts, 'Thoughts retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const getThoughtById = async (req, res, next) => {
    try {
        const thought = await getThoughtByIdService(req.params.id);
        handleResponse(res, 200, thought, 'Thought retrieved successfully');
    } catch (error) {
        next(error);
    }
};

// Post thought
export const postThought = async (req, res, next) => {
    try {
        const thought = await createThoughtService(req.body);
        handleResponse(res, 201, thought, 'Thought created successfully');
    } catch (error) {
        next(error);
    }
};

// Update thought
export const updateThought = async (req, res, next) => {
    try {
        const thought = await updateThoughtService(req.params.id, req.body);
        handleResponse(res, 200, thought, 'Thought updated successfully');
    } catch (error) {
        next(error);
    }
};