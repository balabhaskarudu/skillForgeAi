import Analysis from '../models/Analysis';
import Roadmap, {
  IRoadmap,
} from '../models/Roadmap';

import {
  askGemini,
} from './geminiService';

export const generateRoadmap =
  async (
    analysisId: string,
    userId: string
  ): Promise<IRoadmap> => {
    const analysis =
      await Analysis.findOne({
        _id: analysisId,
        userId,
      });

    if (!analysis) {
      throw new Error(
        'Analysis not found'
      );
    }

    const prompt = `
You are a career mentor.

Generate a 6-week learning roadmap.

Respond ONLY with JSON.

{
  "title": "",
  "roadmap": [
    {
      "week": 1,
      "topic": "",
      "tasks": []
    }
  ]
}

Skill Gaps:

${analysis.skillGaps.join('\n')}
`;

    const response =
      await askGemini(
        prompt
      );

    const cleaned =
      response
        .replace(
          /```json/g,
          ''
        )
        .replace(
          /```/g,
          ''
        )
        .trim();

    const parsed =
      JSON.parse(
        cleaned
      );

    const roadmap =
      await Roadmap.create({
        userId,
        analysisId,
        title:
          parsed.title,
        roadmap:
          parsed.roadmap,
      });

    return roadmap;
  };

  export const getUserRoadmaps =
  async (
    userId: string
  ) => {
    return Roadmap.find({
      userId,
    }).sort({
      createdAt: -1,
    });
  };

  export const getRoadmapById =
  async (
    roadmapId: string,
    userId: string
  ) => {
    return Roadmap.findOne({
      _id: roadmapId,
      userId,
    });
  };