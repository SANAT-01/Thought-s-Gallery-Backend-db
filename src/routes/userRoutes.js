import express from 'express'; 
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';
import validateUser from '../middlewares/userValidate.js';

const router = express.Router();

// GET /users
router.get('/user', validateUser, getUsers);
router.get('/user/:id', getUserById);

// PUT /users/:id
router.put('/user/:id', validateUser, updateUser);

// DELETE /users/:id
router.delete('/user/:id', deleteUser);

export default router;
