import Roadmap from '../models/Roadmap';
import Interview, {
  IInterview,
} from '../models/Interview';

import {
  askGemini,
} from './geminiService';

export const generateInterviewQuestions =
  async (
    roadmapId: string,
    userId: string
  ): Promise<IInterview> => {
    const roadmap =
      await Roadmap.findOne({
        _id: roadmapId,
        userId,
      });

    if (!roadmap) {
      throw new Error(
        'Roadmap not found'
      );
    }

    const topics =
      roadmap.roadmap
        .map(
          (item) =>
            item.topic
        )
        .join('\n');

    const prompt = `
You are an interviewer.

Generate interview questions.

Respond ONLY with JSON.

{
  "easyQuestions": [],
  "mediumQuestions": [],
  "hardQuestions": []
}

Topics:

${topics}
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

    const interview =
      await Interview.create({
        userId,
        roadmapId,
        easyQuestions:
          parsed.easyQuestions ||
          [],
        mediumQuestions:
          parsed.mediumQuestions ||
          [],
        hardQuestions:
          parsed.hardQuestions ||
          [],
      });

    return interview;
  };