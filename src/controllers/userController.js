import { 
    createUserService, 
    deleteUserService, 
    getAllUsersService, 
    getUserByIdService, 
    updateUserService 
} from "../models/userModel.js";

// Common response handler
const handleResponse = (res, status, data = null, message = '') => {
    res.status(status).json({ success: status < 400, status, data, message });
};

// Create a new user
const createUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUserService({ username, email, password });
        handleResponse(res, 201, user, 'User created successfully');
    } catch (error) {
        next(error);
    }
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
        const deleted = await deleteUserService(req.params.id);
        if (!deleted) return handleResponse(res, 404, null, 'User not found');
        handleResponse(res, 200, null, 'User deleted successfully');
    } catch (error) {
        next(error);
    }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
