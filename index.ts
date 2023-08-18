import express, { Application } from "express";
import { envVariables } from "./config/envVaraibles";
import { mainApp } from "./mainApp";
import { dbConfig } from "./config/Database";

const port: number = parseInt(envVariables.PORT!);

const app: Application = express();
mainApp(app);

const server = app.listen(port, () => {
  dbConfig();
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on("uncaughtException", (reason: any) => {
  console.log("uncaughtException: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
