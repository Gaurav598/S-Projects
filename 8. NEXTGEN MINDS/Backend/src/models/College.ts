import mongoose, { Document, Schema } from 'mongoose';

export interface ICollege extends Document {
  name: string;
  location: string;
  programs: string[];
  admissionRequirements: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CollegeSchema = new Schema<ICollege>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    programs: {
      type: [String],
      default: [],
    },
    admissionRequirements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

CollegeSchema.index({ location: 1 });
CollegeSchema.index({ name: 'text', programs: 'text' });

export default mongoose.model<ICollege>('College', CollegeSchema);
