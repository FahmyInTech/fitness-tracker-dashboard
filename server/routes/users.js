import express from 'express';
import { getProfile, updateProfile } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router; 