import mongoose from "mongoose";
import { iUser, iUserData } from "../utils/interface";

const userModel = new mongoose.Schema<iUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);
