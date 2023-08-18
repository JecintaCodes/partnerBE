import { Request, Response } from "express";
import { mainError, HTTP } from "../error/mainError";
import bcrypt from "bcrypt";
import authModel from "../model/authModel";
import cloudinary from "../utils/cloudinary";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const harsh = await bcrypt.hash(password, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path!
    );
    const created = await authModel.create({
      name,
      email,
      password: harsh,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res.status(HTTP.CREATE).json({
      message: "created",
      data: created,
    });
  } catch (error) {
    new mainError({
      name: "register user error",
      message: "This error came as a result of registering a user",
      status: HTTP.BAD,
      success: false,
      
    });

    return res.status(HTTP.BAD).json({
      message: "user not created",
      data: error.message
    });
  }
};
export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const signin = await authModel.findOne({ email });
    if (signin) {
      const checkpassword = await bcrypt.compare(password, signin.password);
      if (checkpassword) {
        return res.status(HTTP.CREATE).json({
          message: `Welcome Back ${signin.name}`,
          data: signin._id,
        });
      } else {
        new mainError({
          name: "User Password error",
          message: "This error came as a result of incorrect password",
          status: HTTP.BAD,
          success: false,
        });
        return res.status(HTTP.BAD).json({
          message: "User password incorrect",
        });
      }
    } else {
      new mainError({
        name: "User not found error",
        message: "This error came as a result of user not found",
        status: HTTP.BAD,
        success: false,
      });
      return res.status(HTTP.BAD).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    new mainError({
      name: "signing in error",
      message: "This error came as a result of signing in user",
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "User error",
    });
  }
};

export const readAllUser = async (req: Request, res: Response) => {
  try {
    const finds = await authModel.find().sort({
      createdAt: -1,
    });

    return res.status(HTTP.OK).json({
      message: "gotten all users",
      data: finds,
    });
  } catch (error) {
    new mainError({
      name: "readallUser error",
      message: "this error came as a result of getting users",
      status: HTTP.BAD,
      success: false,
    });
    return res.status(HTTP.BAD).json({
      message: "error",
    });
  }
};

export const readOneUser = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;
    const finds = await authModel.findById(authID);
    return res.status(HTTP.OK).json({
      message: "read one user",
      data: finds,
    });
  } catch (error) {
    new mainError({
      name: "readOneerror",
      message: "this error came as a result of readOne User error",
      status: HTTP.BAD,
      success: false,
    });
    return res.status(HTTP.BAD).json({
      message: "error",
    });
  }
};
