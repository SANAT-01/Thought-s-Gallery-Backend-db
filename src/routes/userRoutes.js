import express from 'express'; 
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

// GET /users
router.get('/user', getUsers);
router.get('/user/:id', getUserById);

// POST /users
router.post('/user', createUser);

// PUT /users/:id
router.put('/user/:id', updateUser);

// DELETE /users/:id
router.delete('/user/:id', deleteUser);

export default router;
