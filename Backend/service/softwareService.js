import ErrorHandler from "../middleware/error.js";
import { SoftwareApplicationModel } from "../models/softwareModel.js";
import uploadImageCloudinary from "../utils/cloudinary.js";
import deleteFileFromCloudinary from "../utils/deleteImageCloudunary.js";

export const Addsoftware = async (req, softwareData) => {
  const { name } = softwareData;
  const { svg } = req.files;
  if (!name) {
    throw new ErrorHandler("Name is required", 400);
  }
  // console.log(svg)
  const UploadAvatarOncloudinary = await uploadImageCloudinary(
    svg.tempFilePath,
    {
      folder: "SOFTWARE UPlOAD",
    }
  );
  const software = await SoftwareApplicationModel.create({
    name,
    svg: {
      public_id: UploadAvatarOncloudinary.public_id,
      url: UploadAvatarOncloudinary.secure_url,
    },
  });
  // console.log("Send mesage is created", software);
  return software;
};

export const FindAllSenderMesage = async () => {
  const software = await SoftwareApplicationModel.find({});
  if (!software) {
    throw new ErrorHandler("software  data is not fetcehd", 400);
  }
  // console.log("all data", software);
  return software;
};

const UpdateSendersoftware = async (req, softwareid, softwaredate) => {
  const { name } = softwaredate;
  const updateUser = {
    name,
  };

  // Check if SVG file is present in request
  if (req.files && req.files.svg) {
    const { svg } = req.files;

    // Find the software application by ID
    let software = await SoftwareApplicationModel.findById(softwareid);
    if (!software) {
      throw new ErrorHandler("Software not found", 404);
    }

    // If the software has an existing SVG file, delete it from Cloudinary
    if (software.svg && software.svg.public_id) {
      await deleteFileFromCloudinary(software.svg.public_id);
    }

    // Upload the new SVG file to Cloudinary
    const UploadAvatarOncloudinary = await uploadImageCloudinary(svg.tempFilePath, {
      folder: "SOFTWARE_UPLOAD",
    });

    // Update the updateUser object with the new SVG information
    updateUser.svg = {
      public_id: UploadAvatarOncloudinary.public_id,
      url: UploadAvatarOncloudinary.secure_url,
    };

    // Update the software application in the database
    software = await SoftwareApplicationModel.findByIdAndUpdate(softwareid, updateUser, {
      new: true,
    });

    // Return the updated software application
    return software;
  } else {
    // If no SVG file is provided in the request, update only the name
    software = await SoftwareApplicationModel.findByIdAndUpdate(softwareid, updateUser, {
      new: true,
    });

    // Return the updated software application
    return software;
  }
};

export const DeleteSendsoftware = async (softwareid) => {
  let msg = await SoftwareApplicationModel.findById({ _id: softwareid });
  await deleteFileFromCloudinary(msg.svg.public_id);
  if (!msg) {
    throw new ErrorHandler("software not found", 400);
  }
  msg = await SoftwareApplicationModel.findByIdAndDelete(
    { _id: softwareid },
    { new: true }
  );
  console.log("Delete software", msg);

  return msg;
};

export default {
  Addsoftware,
  FindAllSenderMesage,
  DeleteSendsoftware,
  FindAllSenderMesage,
  UpdateSendersoftware,
};
