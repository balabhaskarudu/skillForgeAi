import User from '../models/User';
import Resume from '../models/Resume';
import Analysis from '../models/Analysis';
import Roadmap from '../models/Roadmap';
import Interview from '../models/Interview';

export const getDashboard =
  async (
    userId: string
  ) => {
    const user =
      await User.findById(
        userId
      );

    const resumeCount =
      await Resume.countDocuments({
        userId,
      });

    const analysisCount =
      await Analysis.countDocuments({
        userId,
      });

    const roadmapCount =
      await Roadmap.countDocuments({
        userId,
      });

    const interviewCount =
      await Interview.countDocuments({
        userId,
      });

    const latestResume =
      await Resume.findOne({
        userId,
      }).sort({
        createdAt: -1,
      });

    const latestAnalysis =
      await Analysis.findOne({
        userId,
      }).sort({
        createdAt: -1,
      });

    const latestRoadmap =
      await Roadmap.findOne({
        userId,
      }).sort({
        createdAt: -1,
      });

    const latestInterview =
      await Interview.findOne({
        userId,
      }).sort({
        createdAt: -1,
      });

    return {
      profile: {
        name: user?.name,
        email: user?.email,
      },

      resumeCount,
      analysisCount,
      roadmapCount,
      interviewCount,

      latestResume,
      latestAnalysis,
      latestRoadmap,
      latestInterview,
    };
  };