import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(null, 'uploads/');
  },

  filename: (
    req,
    file,
    cb
  ) => {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      `${uniqueSuffix}-${file.originalname}`
    );
  },
});

const fileFilter: multer.Options['fileFilter'] = (
  req,
  file,
  cb
) => {
  const allowedExtensions = [
    '.pdf',
    '.doc',
    '.docx',
  ];

  const extension = path.extname(
    file.originalname
  ).toLowerCase();

  if (
    allowedExtensions.includes(
      extension
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Only PDF, DOC and DOCX files are allowed'
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      5 * 1024 * 1024,
  },
});

export default upload;