import mongoose, {
  Document,
  Schema,
  Types,
} from 'mongoose';

interface RoadmapItem {
  week: number;
  topic: string;
  tasks: string[];
}

export interface IRoadmap
  extends Document {
  userId: Types.ObjectId;
  analysisId: Types.ObjectId;
  title: string;
  roadmap: RoadmapItem[];
  createdAt: Date;
  updatedAt: Date;
}

const roadmapSchema =
  new Schema<IRoadmap>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      analysisId: {
        type: Schema.Types.ObjectId,
        ref: 'Analysis',
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      roadmap: [
        {
          week: Number,
          topic: String,
          tasks: [String],
        },
      ],
    },
    {
      timestamps: true,
    }
  );

const Roadmap =
  mongoose.model<IRoadmap>(
    'Roadmap',
    roadmapSchema
  );

export default Roadmap;