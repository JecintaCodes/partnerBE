import dotenv from "dotenv";
dotenv.config();

export const envVariables = {
  PORT: process.env.PORT,
  DATABASE: process.env.DATABASE,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_KEY: process.env.CLOUD_KEY,
  CLOUD_SECRET: process.env.CLOUD_SECRET,
};
