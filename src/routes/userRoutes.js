import express from 'express'; 
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';
import validateUser from '../middlewares/userValidate.js';
import { checkAuth } from '../util/auth.js';

const router = express.Router();

// GET /users
router.get('/user', checkAuth, getUsers);
router.get('/user/:id', checkAuth, getUserById);

// PUT /users/:id
router.put('/user/:id', checkAuth, validateUser, updateUser);

// DELETE /users/:id
router.delete('/user/:id', checkAuth, deleteUser);

export default router;
