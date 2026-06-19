import {
  Request,
  Response,
} from 'express';

import {
  analyzeResume,getUserAnalyses
} from '../services/analysisService';
import {
  asyncHandler,
} from '../utils/asyncHandler';

export const analyzeResumeController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user =
        (req as any).user;

      const resumeId =
        String(
          req.params
            .resumeId
        );

      const analysis =
        await analyzeResume(
          resumeId,
          user.userId
        );

      res.status(201).json({
        success: true,
        message:
          'Resume analyzed successfully',
        data: analysis,
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

  export const getAnalyses =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user =
        (req as any).user;

      const analyses =
        await getUserAnalyses(
          user.userId
        );

      res.status(200).json({
        success: true,
        data: analyses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          'Internal Server Error',
      });
    }
  };

