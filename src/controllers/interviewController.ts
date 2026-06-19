import {
  Request,
  Response,
} from 'express';

import {
  generateInterviewQuestions,
} from '../services/interviewService';

export const generateInterviewController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user =
        (req as any).user;

      const roadmapId =
        String(
          req.params
            .roadmapId
        );

      const interview =
        await generateInterviewQuestions(
          roadmapId,
          user.userId
        );

      res.status(201).json({
        success: true,
        message:
          'Interview questions generated successfully',
        data: interview,
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