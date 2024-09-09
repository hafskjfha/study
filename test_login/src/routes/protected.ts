import express from 'express';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  res.json({ msg: 'Welcome to the protected route!' });
});

export default router;
