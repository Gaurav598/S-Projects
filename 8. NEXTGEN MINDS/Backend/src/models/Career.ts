import mongoose, { Document, Schema } from 'mongoose';

export interface ICareer extends Document {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  salary: {
    min: number;
    max: number;
  };
  growth: string;
  roadmap: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    salary: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    growth: {
      type: String,
      default: '',
    },
    roadmap: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

CareerSchema.index({ skills: 1 });
CareerSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<ICareer>('Career', CareerSchema);
