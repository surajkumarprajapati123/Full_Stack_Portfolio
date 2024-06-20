import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "config/config.env" });

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (localpath) => {
  try {
    if (!localpath) return null;
    const upload = await cloudinary.uploader.upload(localpath);
    console.log("Image uploaded successfully", upload.url);
    fs.unlinkSync(localpath);
    return upload;
  } catch (error) {
    fs.unlinkSync(localpath);
    console.log("Error is ", error);
  }
};

export default uploadImageCloudinary;
