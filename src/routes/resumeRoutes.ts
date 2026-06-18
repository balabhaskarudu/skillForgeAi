import express from 'express';
import { uploadResume } from '../controllers/resumeController';
import { verifyToken } from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.post(
  '/upload',
  verifyToken,
  upload.single('resume'),
  uploadResume
);

export default router;