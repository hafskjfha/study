import express from 'express';
import { body } from 'express-validator';
import { signup, login } from '../controllers/authController';

const router = express.Router();

// Signup route
router.post(
  '/signup',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  signup
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  login
);

export default router;
