import express from 'express';
import { uploadResume } from '../controllers/resumeController';
import { verifyToken } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';
import {
  getResumes,
  getResume,
} from '../controllers/resumeController';
const router = express.Router();

router.post(
  '/upload',
  verifyToken,
  upload.single('resume'),
  uploadResume
);
router.get(
  '/',
  verifyToken,
  getResumes
);

router.get(
  '/:resumeId',
  verifyToken,
  getResume
);

export default router;