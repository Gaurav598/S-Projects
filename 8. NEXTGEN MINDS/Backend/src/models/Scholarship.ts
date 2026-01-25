import mongoose, { Document, Schema } from 'mongoose';

export interface IScholarship extends Document {
  title: string;
  description: string;
  amount: number;
  eligibility: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ScholarshipSchema = new Schema<IScholarship>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ScholarshipSchema.index({ deadline: 1 });
ScholarshipSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);
