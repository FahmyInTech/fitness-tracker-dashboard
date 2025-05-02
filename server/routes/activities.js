import express from 'express';
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity
} from '../controllers/activities.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/', auth, getActivities);
router.post('/', auth, createActivity);
router.put('/:id', auth, updateActivity);
router.delete('/:id', auth, deleteActivity);

export default router; 