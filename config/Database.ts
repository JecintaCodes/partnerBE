import mongoose from "mongoose";
import { envVariables } from "./envVaraibles";

const local: string = envVariables.DATABASE!;

export const dbConfig = () => {
  mongoose.connect(local).then(() => {
    console.log("connected");
  });
};
