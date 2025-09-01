import { createUserService, signInUserService } from "../models/authModel.js";
import { createJSONToken } from "../util/auth.js";


// Common response handler
const handleResponse = (res, status, data = null, message = '') => {
    res.status(status).json({ success: status < 400, status, data, message });
};

// Create a new user
const createUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUserService({ username, email, password });
        const authToken = createJSONToken(user.email);
        handleResponse(res, 201, { user, authToken }, 'User created successfully');
    } catch (error) {
        next(error);
    }
};

const signInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await signInUserService(email, password);
        const authToken = createJSONToken(user.email);
        handleResponse(res, 200, { user, authToken }, 'User signed in successfully');
    } catch (error) {
        next(error);
    }
};

export { createUser, signInUser };
