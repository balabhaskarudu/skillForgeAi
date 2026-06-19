import mongoose, {
  Document,
  Schema,
  Types,
} from 'mongoose';

export interface IAnalysis
  extends Document {
  userId: Types.ObjectId;
  resumeId: Types.ObjectId;
  strengths: string[];
  skillGaps: string[];
  recommendations: string[];
  createdAt: Date;
  updatedAt: Date;
}

const analysisSchema =
  new Schema<IAnalysis>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      resumeId: {
        type: Schema.Types.ObjectId,
        ref: 'Resume',
        required: true,
      },

      strengths: {
        type: [String],
        default: [],
      },

      skillGaps: {
        type: [String],
        default: [],
      },

      recommendations: {
        type: [String],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

const Analysis =
  mongoose.model<IAnalysis>(
    'Analysis',
    analysisSchema
  );

export default Analysis;