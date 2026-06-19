import {
  Request,
  Response,
} from 'express';

import {
  generateRoadmap,
} from '../services/roadmapService';

export const generateRoadmapController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user =
        (req as any).user;

      const analysisId =
        String(
          req.params
            .analysisId
        );

      const roadmap =
        await generateRoadmap(
          analysisId,
          user.userId
        );

      res.status(201).json({
        success: true,
        message:
          'Roadmap generated successfully',
        data: roadmap,
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