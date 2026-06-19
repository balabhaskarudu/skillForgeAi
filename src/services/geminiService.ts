import genAI from '../config/gemini';

const model =
  genAI.getGenerativeModel({
    model:
      process.env.GEMINI_MODEL ||
      'gemini-1.5-flash',
  });

export const askGemini =
  async (
    prompt: string
  ): Promise<string> => {
    const result =
      await model.generateContent(
        prompt
      );

    const response =
      result.response;

    return response.text();
  };