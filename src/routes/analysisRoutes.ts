import express from 'express';

import {
  analyzeResumeController,getAnalyses
} from '../controllers/analysisController';

import {
  verifyToken,
} from '../middleware/authMiddleware';

const router =
  express.Router();

router.post(
  '/resume/:resumeId',
  verifyToken,
  analyzeResumeController
);
router.get(
  '/',
  verifyToken,
  getAnalyses
);

export default router;