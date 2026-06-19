import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const extractTextFromFile = async (
  filePath: string
): Promise<string> => {
  if (filePath.endsWith('.pdf')) {
    const dataBuffer =
      fs.readFileSync(filePath);

    const pdfData =
      await pdf(dataBuffer);

    return pdfData.text;
  }

  if (filePath.endsWith('.docx')) {
    const result =
      await mammoth.extractRawText({
        path: filePath,
      });

    return result.value;
  }

  throw new Error(
    'Unsupported file type'
  );
};