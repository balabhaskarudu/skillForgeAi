import Resume, { IResume } from '../models/Resume';


interface CreateResumeInput {
  userId: string;
  originalFileName: string;
  filePath: string;
}
//crete a new resume
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
//get resumes for a user
export const getUserResumes = async (
  userId: string
): Promise<IResume[]> => {
  return Resume.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};
//get a resume by id
export const getResumeById = async (
  resumeId: string,
  userId: string
): Promise<IResume | null> => {
  return Resume.findOne({
    _id: resumeId,
    userId,
  });
};
//update extracted text for a resume
export const updateExtractedText = async (
  resumeId: string,
  extractedText: string
): Promise<IResume | null> => {
  return Resume.findByIdAndUpdate(
    resumeId,
    {
      extractedText,
      uploadStatus: 'ANALYZED',
    },
    {
      new: true,
    }
  );
};

// export const uploadResume = async (
//   userId: string,
//   file: Express.Multer.File
// ) => {
//   const resume = await Resume.create({
//     userId,
//     originalFileName: file.originalname,
//     filePath: file.path,
//     uploadStatus: "UPLOADED",
//   });

//   try {
//     resume.uploadStatus = "PROCESSING";
//     await resume.save();

//     const extractedText =
//       await extractTextFromFile(
//         resume.filePath
//       );

//     resume.extractedText =
//       extractedText;

//     resume.uploadStatus =
//       "ANALYZED";

//     await resume.save();

//     return resume;
//   } catch (error) {
//     resume.uploadStatus =
//       "FAILED";

//     await resume.save();

//     throw error;
//   }
// };