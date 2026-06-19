import {
  Request,
  Response,
} from 'express';

import {
  generateRoadmap,
  getUserRoadmaps,
  getRoadmapById,
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

  export const getRoadmaps = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user =
      (req as any).user;

    const roadmaps =
      await getUserRoadmaps(
        user.userId
      );

    res.status(200).json({
      success: true,
      data: roadmaps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'Internal Server Error',
    });
  }
};

export const getRoadmap = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user =
      (req as any).user;

    const roadmap =
      await getRoadmapById(
        String(
          req.params
            .roadmapId
        ),
        user.userId
      );

    if (!roadmap) {
      res.status(404).json({
        success: false,
        message:
          'Roadmap not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'Internal Server Error',
    });
  }
};