import { 
    deleteUserService, 
    getAllUsersService, 
    getUserByIdService, 
    updateUserService 
} from "../models/userModel.js";

// Common response handler
const handleResponse = (res, status, data = null, message = '') => {
    res.status(status).json({ success: status < 400, status, data, message });
};

// Get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, users, 'Users fetched successfully');
    } catch (error) {
        next(error);
    }
};

// Get a single user by ID
const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) return handleResponse(res, 404, null, 'User not found');
        handleResponse(res, 200, user, 'User fetched successfully');
    } catch (error) {
        next(error);
    }
};

// Update a user by ID
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        // Get user from DB first
        const existingUser = await getUserByIdService(userId);
        if (!existingUser) {
            return handleResponse(res, 404, null, 'User not found');
        }

        // Ownership check: email from token must match DB
        if (req.user.email !== existingUser.email) {
            return handleResponse(res, 403, null, 'Forbidden: Not your account');
        }
        const user = await updateUserService(req.params.id, req.body);
        if (!user) return handleResponse(res, 404, null, 'User not found');
        handleResponse(res, 200, user, 'User updated successfully');
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
            return handleResponse(res, 404, null, 'User not found');
        }

        // Ownership check
        if (req.user.email !== existingUser.email) {
            return handleResponse(res, 403, null, 'Forbidden: Not your account');
        }
        const deleted = await deleteUserService(req.params.id);
        if (!deleted) return handleResponse(res, 404, null, 'User not found');
        handleResponse(res, 200, null, 'User deleted successfully');
    } catch (error) {
        next(error);
    }
};

export { getUsers, getUserById, updateUser, deleteUser };
