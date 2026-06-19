import mongoose, {
  Document,
  Schema,
  Types,
} from 'mongoose';

export interface IInterview
  extends Document {
  userId: Types.ObjectId;
  roadmapId: Types.ObjectId;
  easyQuestions: string[];
  mediumQuestions: string[];
  hardQuestions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const interviewSchema =
  new Schema<IInterview>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      roadmapId: {
        type: Schema.Types.ObjectId,
        ref: 'Roadmap',
        required: true,
      },

      easyQuestions: {
        type: [String],
        default: [],
      },

      mediumQuestions: {
        type: [String],
        default: [],
      },

      hardQuestions: {
        type: [String],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

const Interview =
  mongoose.model<IInterview>(
    'Interview',
    interviewSchema
  );

export default Interview;