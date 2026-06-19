import express from 'express';

import {
  getDashboardController,
} from '../controllers/dashboardController';

import {
  verifyToken,
} from '../middleware/authMiddleware';

const router =
  express.Router();

router.get(
  '/',
  verifyToken,
  getDashboardController
);

export default router;