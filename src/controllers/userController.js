import {
    deleteUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
} from "../models/userModel.js";
import handleResponse from "../util/response.js";
import dotenv from "dotenv";
import { put } from "@vercel/blob";

dotenv.config();

// Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, users, "Users fetched successfully");
    } catch (error) {
        next(error);
    }
};

// Get a single user by ID
const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) return handleResponse(res, 404, null, "User not found");
        handleResponse(res, 200, user, "User fetched successfully");
    } catch (error) {
        next(error);
    }
};

// Update a user by ID
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { username, bio } = req.body;

        // Find existing user
        const existingUser = await getUserByIdService(userId);
        if (!existingUser) {
            return handleResponse(res, 404, null, "User not found");
        }

        // Ownership check
        if (req.user.email !== existingUser.email) {
            return handleResponse(
                res,
                403,
                null,
                "Forbidden: Not your account"
            );
        }

        let profile_picture = existingUser.profile_picture;

        // If image uploaded, send to Vercel Blob
        if (req.file) {
            const blob = await put(
                `profile-images/${Date.now()}-${req.file.originalname}`,
                req.file.buffer, // file buffer in memory
                { access: "public", token: process.env.BLOB_READ_WRITE_TOKEN }
            );

            profile_picture = blob.url; // public blob URL
        }

        const updatedUser = await updateUserService(userId, {
            username,
            bio,
            profile_picture,
        });

        return handleResponse(
            res,
            200,
            updatedUser,
            "User updated successfully"
        );
    } catch (error) {
        next(error);
    }
};

// Delete a user by ID
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        // Get user from DB
        const existingUser = await getUserByIdService(userId);
        if (!existingUser) {
            return handleResponse(res, 404, null, "User not found");
        }

        // Ownership check
        if (req.user.email !== existingUser.email) {
            return handleResponse(
                res,
                403,
                null,
                "Forbidden: Not your account"
            );
        }
        const deleted = await deleteUserService(req.params.id);
        if (!deleted) return handleResponse(res, 404, null, "User not found");
        handleResponse(res, 200, null, "User deleted successfully");
    } catch (error) {
        next(error);
    }
};

export { getUsers, getUserById, updateUser, deleteUser };
