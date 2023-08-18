import { Router } from "express";
import { Upload } from "../utils/multer";
import {
  readAllUser,
  readOneUser,
  registerUser,
  signinUser,
} from "../controller/authController";

const user: Router = Router();

user.route("/register").post(Upload, registerUser);
user.route("/sign-in").post(signinUser);
user.route("/see").get(readAllUser);
user.route("/:authID/see").get(readOneUser);

export default user;
