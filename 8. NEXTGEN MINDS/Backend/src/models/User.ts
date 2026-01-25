import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile {
  name: string;
  age?: number;
  education?: string;
  interests: string[];
  skills: string[];
  experience?: string;
  goals: string[];
  location?: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  profile: IUserProfile;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
      },
      education: {
        type: String,
      },
      interests: {
        type: [String],
        default: [],
      },
      skills: {
        type: [String],
        default: [],
      },
      experience: {
        type: String,
      },
      goals: {
        type: [String],
        default: [],
      },
      location: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
