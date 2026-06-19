import {
  Request,
  Response,
} from 'express';

import {
  getDashboard,
} from '../services/dashboardService';

export const getDashboardController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user =
        (req as any).user;

      const dashboard =
        await getDashboard(
          user.userId
        );

      res.status(200).json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          'Internal Server Error',
      });
    }
  };