import { Request, Response } from 'express';
import { createResume } from '../services/resumeService';

export const uploadResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'Resume file is required',
      });
      return;
    }

    const user = (req as any).user;

    const resume = await createResume({
      userId: user.userId,
      originalFileName:
        req.file.originalname,
      filePath:
        req.file.path,
    });

    res.status(201).json({
      success: true,
      message:
        'Resume uploaded successfully',
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Internal Server Error',
    });
  }
};