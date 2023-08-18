import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorBuilder";
import user from "./router/authRouter";

export const mainApp = (app: Application) => {
  app.use(express.json()).use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(HTTP.OK).json({
        message: "api is live....",
      });
    } catch (error) {
      return res.status(HTTP.BAD).json({
        message: "error messgae",
      });
    }
  });

  app.use("/api", user);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Router Error",
        message: `This error came as a result of ${req.originalUrl} URL incorrect`,
        status: HTTP.BAD,
        success: false,
      })
    );
  });

  app.use(errorHandler);
};
