import express from 'express';

import {
  generateInterviewController,
} from '../controllers/interviewController';

import {
  verifyToken,
} from '../middleware/authMiddleware';

const router =
  express.Router();

router.post(
  '/generate/:roadmapId',
  verifyToken,
  generateInterviewController
);

export default router;