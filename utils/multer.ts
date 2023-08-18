import multer from "multer";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "Upload");
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

export const Upload = multer({ storage: storage }).single("avatar");
