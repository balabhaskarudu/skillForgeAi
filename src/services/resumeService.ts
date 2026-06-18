import Resume from '../models/Resume';
import { IResume } from '../models/Resume';

interface CreateResumeInput {
  userId: string;
  originalFileName: string;
  filePath: string;
}

export const createResume = async (
  data: CreateResumeInput
): Promise<IResume> => {
  const resume = await Resume.create({
    userId: data.userId,
    originalFileName: data.originalFileName,
    filePath: data.filePath,
  });

  return resume;
};