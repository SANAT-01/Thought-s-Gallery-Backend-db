import {
    deleteUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
} from "../models/userModel.js";
import handleResponse from "../util/response.js";
import dotenv from "dotenv";

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
        const existingUser = await getUserByIdService(userId);
        if (!existingUser) {
            return handleResponse(res, 404, null, "User not found");
        }

        if (req.user.email !== existingUser.email) {
            return handleResponse(
                res,
                403,
                null,
                "Forbidden: Not your account"
            );
        }

        // If file uploaded, use its path
        const profile_picture = req.file
            ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
            : existingUser.profile_picture;
        const user = await updateUserService(userId, {
            username: req.body.username,
            bio: req.body.bio,
            profile_picture,
        });

        handleResponse(res, 200, user, "User updated successfully");
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
