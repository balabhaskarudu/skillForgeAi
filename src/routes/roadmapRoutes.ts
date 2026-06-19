import express from 'express';

import {
  generateRoadmapController,
} from '../controllers/roadmapController';

import {
  verifyToken,
} from '../middleware/authMiddleware';

const router =
  express.Router();

router.post(
  '/generate/:analysisId',
  verifyToken,
  generateRoadmapController
);

export default router;