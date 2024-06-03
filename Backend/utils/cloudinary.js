import dotenv from "dotenv";

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
    const upload = await cloudinary.uploader.upload(localpath, {
      resouce_type: "image",
    });
    console.log("Image uploaded successfully", upload.url);
    return upload;
  } catch (error) {
    console.log("Error is ", error);
  }
};

export default uploadImageCloudinary;
