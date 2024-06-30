import ErrorHandler from "../middleware/error.js";
import { ProjectModel } from "../models/projectModle.js";
import uploadImageCloudinary from "../utils/cloudinary.js";
import deleteFileFromCloudinary from "../utils/deleteImageCloudunary.js";

export const AddProject = async (req, ProjectData) => {
  const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = ProjectData;
  const { projectBanner } = req.files;

  // Check if any required field is missing
  if (!title) {
    throw new ErrorHandler("Title is required", 400);
  }
  if (!description) {
    throw new ErrorHandler("Description is required", 400);
  }
  if (!gitRepoLink) {
    throw new ErrorHandler("GitHub Repository Link is required", 400);
  }
  if (!projectLink) {
    throw new ErrorHandler("Project Link is required", 400);
  }
  if (!technologies) {
    throw new ErrorHandler("Technologies are required", 400);
  }
  if (!stack) {
    throw new ErrorHandler("Stack is required", 400);
  }
  if (!deployed) {
    throw new ErrorHandler("Deployment status is required", 400);
  }

  try {
    const UploadAvatarOncloudinary = await uploadImageCloudinary(projectBanner.tempFilePath, {
      folder: "Project UPLOAD",
    });

    const project = await ProjectModel.create({
      title,
      description,
      gitRepoLink,
      projectLink,
      technologies,
      stack,
      deployed,
      projectBanner: {
        public_id: UploadAvatarOncloudinary.public_id,
        url: UploadAvatarOncloudinary.secure_url,
      },
    });

    // console.log("Project created:", project);
    return project;
  } catch (error) {
    // Handle any other unexpected errors
    throw new ErrorHandler("Error creating project", 500);
  }
};

export const FindAllSenderMesage = async () => {
  const Project = await ProjectModel.find({});
  if (!Project) {
    throw new ErrorHandler("Project  data is not fetcehd", 400);
  }
  // console.log("all data", Project);
  return Project;
};


export const UpdateSenderProject = async (req, Projectid, Projectdate) => {
  const {  title, description, gitRepoLink, projectLink, technologies, stack, deployed } = Projectdate;
  
  // Create an object with fields that need to be updated
  const updateUser = {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed
  };

  try {
    // Check if projectBanner file is present in request
    if (req.files && req.files.projectBanner) {
      const { projectBanner } = req.files;

      // Find the Project by ID
      let project = await ProjectModel.findById(Projectid);
      if (!project) {
        throw new ErrorHandler("Project not found", 404);
      }

      // If the Project has an existing projectBanner file, delete it from Cloudinary
      if (project.projectBanner && project.projectBanner.public_id) {
        await deleteFileFromCloudinary(project.projectBanner.public_id);
      }

      // Upload the new projectBanner file to Cloudinary
      const UploadAvatarOncloudinary = await uploadImageCloudinary(projectBanner.tempFilePath, {
        folder: "Project_UPLOAD",
      });

      // Update the updateUser object with the new projectBanner information
      updateUser.projectBanner = {
        public_id: UploadAvatarOncloudinary.public_id,
        url: UploadAvatarOncloudinary.secure_url,
      };
    }

    // Update the Project in the database
    const updatedProject = await ProjectModel.findByIdAndUpdate(Projectid, updateUser, {
      new: true, // Return the updated document
    });

    if (!updatedProject) {
      throw new ErrorHandler("Failed to update Project", 500);
    }

    // Return the updated Project
    return updatedProject;
  } catch (error) {
    // Handle errors
    if (error instanceof ErrorHandler) {
      throw error; // Rethrow custom error
    } else {
      throw new ErrorHandler("Error updating Project", 500);
    }
  }
};


export const DeleteSendProject = async (Projectid) => {
  let msg = await ProjectModel.findById({ _id: Projectid });
  await deleteFileFromCloudinary(msg.projectBanner.public_id);
  if (!msg) {
    throw new ErrorHandler("Project not found", 400);
  }
  msg = await ProjectModel.findByIdAndDelete(
    { _id: Projectid },
    { new: true }
  );
  console.log("Delete Project", msg);

  return msg;
};

export default {
  AddProject,
  FindAllSenderMesage,
  DeleteSendProject,
  FindAllSenderMesage,
  UpdateSenderProject,
};
