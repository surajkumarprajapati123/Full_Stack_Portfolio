import multer from "multer";
import path from "path";

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationDir = path.join(__dirname, ".././public/upload");
    console.log("destinationDir", destinationDir);
    cb(null, destinationDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
