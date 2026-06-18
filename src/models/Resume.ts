import mongoose, {
  Document,
  Schema,
  Types,
} from 'mongoose';

export enum ResumeStatus {
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  ANALYZED = 'ANALYZED',
  FAILED = 'FAILED',
}

export interface IResume extends Document {
  userId: Types.ObjectId;
  originalFileName: string;
  filePath: string;
  extractedText: string;
  uploadStatus: ResumeStatus;
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
      trim: true,
    },

    extractedText: {
      type: String,
      default: '',
    },

    uploadStatus: {
      type: String,
      enum: Object.values(ResumeStatus),
      default: ResumeStatus.UPLOADED,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model<IResume>(
  'Resume',
  resumeSchema
);

export default Resume;