import mongoose, { Document } from "mongoose";
import ImageSchema from "./image.model";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Interface
interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  role: Role;

  profile_image?: {
    path: string;
    public_id: string;
  };
}

// Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },

    profile_image: {
      type: ImageSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Model
const User = mongoose.model<IUser>("user", userSchema);

export default User;