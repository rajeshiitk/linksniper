import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, req.originalUrl + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage }); // here we are configuring multer to use the disk storage engine for storing files.
