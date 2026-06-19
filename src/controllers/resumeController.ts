import { Request, Response } from 'express';
import { createResume } from '../services/resumeService';
import {
    getUserResumes,
    getResumeById,
} from '../services/resumeService';
import {
  extractTextFromFile,
} from '../services/resumeParserService';

import {
  updateExtractedText,
} from '../services/resumeService';
//upload a new resume
export const uploadResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const file = (req as any).file;

    if (!file) {
      res.status(400).json({
        success: false,
        message: 'Resume file is required',
      });
      return;
    }

    const user = (req as any).user;

    const resume = await createResume({
      userId: user.userId,
      originalFileName: file.originalname,
      filePath: file.path,
    });

    const extractedText =
      await extractTextFromFile(
        file.path
      );

    const updatedResume =
      await updateExtractedText(
        String(resume._id),
        extractedText
      );

    res.status(201).json({
      success: true,
      message:
        'Resume uploaded successfully',
      data: updatedResume,
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

//get Resumes for a user
export const getResumes = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user =
            (req as any).user;

        const resumes =
            await getUserResumes(
                user.userId
            );

        res.status(200).json({
            success: true,
            data: resumes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Internal Server Error',
        });
    }
};

//get a resume by id
export const getResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user =
      (req as any).user;

    const resumeId = String(
      req.params.resumeId
    );

    const resume =
      await getResumeById(
        resumeId,
        user.userId
      );

    if (!resume) {
      res.status(404).json({
        success: false,
        message:
          'Resume not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        'Internal Server Error',
    });
  }
};