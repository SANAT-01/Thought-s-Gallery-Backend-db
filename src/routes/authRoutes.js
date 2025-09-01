import express from 'express'; 
import validateUser from '../middlewares/userValidate.js';
import { createUser, signInUser } from '../controllers/authController.js';

const router = express.Router();

// POST /auth/signup
router.post('/signup', validateUser, createUser);

// POST /auth/signin
router.post('/signin', validateUser, signInUser);

export default router;
