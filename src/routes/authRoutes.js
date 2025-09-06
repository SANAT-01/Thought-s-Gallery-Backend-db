import express from 'express'; 
import {validateCreateUser, validateLoginUser} from '../middlewares/userValidate.js';
import { createUser, signInUser } from '../controllers/authController.js';

const router = express.Router();

// POST /auth/signup
router.post('/signup', validateCreateUser, createUser);

// POST /auth/signin
router.post('/signin', validateLoginUser, signInUser);

export default router;
