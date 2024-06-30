import ErrorHandler from "../middleware/error.js";
import { SkillModel } from "../models/skillModle.js";
import uploadImageCloudinary from "../utils/cloudinary.js";
import deleteFileFromCloudinary from "../utils/deleteImageCloudunary.js";

export const Addskill = async (req, skillData) => {
  const { title,proficiency } = skillData;
  const { svg } = req.files;
  if (!title) {
    throw new ErrorHandler("Name is required", 400);
  }
  // console.log(svg)
  const UploadAvatarOncloudinary = await uploadImageCloudinary(
    svg.tempFilePath,
    {
      folder: "Skill UPlOAD",
    }
  );
  const skill = await SkillModel.create({
    proficiency,
    title,
    svg: {
      public_id: UploadAvatarOncloudinary.public_id,
      url: UploadAvatarOncloudinary.secure_url,
    },
  });
  console.log("Send mesage is created", skill);
  return skill;
};

export const FindAllSenderMesage = async () => {
  const skill = await SkillModel.find({});
  if (!skill) {
    throw new ErrorHandler("skill  data is not fetcehd", 400);
  }
  // console.log("all data", skill);
  return skill;
};

const UpdateSenderskill = async (req, skillid, skilldate) => {
  const { title,proficiency } = skilldate;
  const updateUser = {
    title,
    proficiency
  };

  // Check if SVG file is present in request
  if (req.files && req.files.svg) {
    const { svg } = req.files;

    // Find the skill application by ID
    let skill = await SkillModel.findById(skillid);
    if (!skill) {
      throw new ErrorHandler("skill not found", 404);
    }

    // If the skill has an existing SVG file, delete it from Cloudinary
    if (skill.svg && skill.svg.public_id) {
      await deleteFileFromCloudinary(skill.svg.public_id);
    }

    // Upload the new SVG file to Cloudinary
    const UploadAvatarOncloudinary = await uploadImageCloudinary(svg.tempFilePath, {
      folder: "skill_UPLOAD",
    });

    // Update the updateUser object with the new SVG information
    updateUser.svg = {
      public_id: UploadAvatarOncloudinary.public_id,
      url: UploadAvatarOncloudinary.secure_url,
    };

    // Update the skill application in the database
    skill = await SkillModel.findByIdAndUpdate(skillid, updateUser, {
      new: true,
    });

    // Return the updated skill application
    return skill;
  } else {
    // If no SVG file is provided in the request, update only the name
    skill = await SkillModel.findByIdAndUpdate(skillid, updateUser, {
      new: true,
    });

    // Return the updated skill application
    return skill;
  }
};

export const DeleteSendskill = async (skillid) => {
  let msg = await SkillModel.findById({ _id: skillid });
  await deleteFileFromCloudinary(msg.svg.public_id);
  if (!msg) {
    throw new ErrorHandler("skill not found", 400);
  }
  msg = await SkillModel.findByIdAndDelete(
    { _id: skillid },
    { new: true }
  );
  console.log("Delete skill", msg);

  return msg;
};

export default {
  Addskill,
  FindAllSenderMesage,
  DeleteSendskill,
  FindAllSenderMesage,
  UpdateSenderskill,
};
