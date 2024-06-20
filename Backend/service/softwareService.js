import ErrorHandler from "../middleware/error.js";
import { SoftwareApplicationModel } from "../models/SoftwareApplicationModel.js";
import uploadImageCloudinary from "../utils/cloudinary.js";
import deleteFileFromCloudinary from "../utils/deleteImageCloudunary.js";

export const Addsoftware = async (req, softwareData) => {
  const { name } = softwareData;
  const { svg } = req.files;
  if (!name) {
    throw new ErrorHandler("Name is required", 400);
  }
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
  console.log("Send mesage is created", software);
  return software;
};

export const FindAllSenderMesage = async () => {
  const software = await SoftwareApplicationModel.find({});
  if (!software) {
    throw new ErrorHandler("software  data is not fetcehd", 400);
  }
  console.log("all data", software);
  return software;
};

export const UpdateSendersoftware = async (req, softwareid, softwaredate) => {
  const { name } = softwaredate;
  const updateUser = {
    name,
  };
  const { svg } = req.files;
  let software = await SoftwareApplicationModel.findById({ _id: softwareid });
  if (!software) {
    throw new ErrorHandler("software not found", 400);
  }
  if (req.files && req.files.avg) {
    if (software.svg && software.svg.public_id)
      await deleteFileFromCloudinary(software.svg.public_id);
    const UploadAvatarOncloudinary = await uploadImageCloudinary(
      svg.tempFilePath,
      {
        folder: "SOFTWARE UPlOAD",
      }
    );
    updateUser.svg = {
      public_id: UploadAvatarOncloudinary.public_id,
      url: UploadAvatarOncloudinary.secure_url,
    };
  }

  software = await SoftwareApplicationModel.findByIdAndUpdate(
    { _id: softwareid },
    updateUser,
    {
      new: true,
    }
  );
  console.log("Updated software", software);

  return software;
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
