import Analysis, {
  IAnalysis,
} from '../models/Analysis';

import Resume from '../models/Resume';

import {
  askGemini,
} from './geminiService';

interface AnalysisResult {
  strengths: string[];
  skillGaps: string[];
  recommendations: string[];
}

export const analyzeResume = async (
  resumeId: string,
  userId: string
): Promise<IAnalysis> => {
  const resume =
    await Resume.findOne({
      _id: resumeId,
      userId,
    });

  if (!resume) {
    throw new Error(
      'Resume not found'
    );
  }

  if (!resume.extractedText) {
    throw new Error(
      'Resume text not found'
    );
  }

 const prompt = `
You are an API.

Respond ONLY with raw JSON.

Do NOT:
- use markdown
- use \`\`\`json
- explain anything
- add extra text

Return EXACTLY:

{
  "strengths": [],
  "skillGaps": [],
  "recommendations": []
}

Resume:

${resume.extractedText}
`;

  const response =
    await askGemini(
      prompt
    );

  
let parsed: AnalysisResult;

try {
  const cleanedResponse = response
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  console.log(
    'Cleaned Gemini Response:',
    cleanedResponse
  );

  parsed = JSON.parse(
    cleanedResponse
  );
} catch (error) {
  console.error(
    'JSON Parse Error:',
    error
  );

  throw new Error(
    'Invalid Gemini response'
  );
}

  const analysis =
    await Analysis.create({
      userId,
      resumeId,
      strengths:
        parsed.strengths ||
        [],
      skillGaps:
        parsed.skillGaps ||
        [],
      recommendations:
        parsed.recommendations ||
        [],
    });

  return analysis;
};

export const getUserAnalyses =
  async (
    userId: string
  ) => {
    return Analysis.find({
      userId,
    })
      .populate('resumeId')
      .sort({
        createdAt: -1,
      });
  };