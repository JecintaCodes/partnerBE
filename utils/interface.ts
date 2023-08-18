import mongoose from "mongoose";

export interface iUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
}

export interface iUserData extends iUser, mongoose.Document {}
