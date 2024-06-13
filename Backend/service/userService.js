import UserModel from "../models/userModel.js";
import uploadImageCloudinary from "../utils/cloudinary.js";
const CreateUser = async (req, userdate) => {
  const { avatar, resume } = req.files;

  // POSTING Avatar

  const UploadAvatarOncloudinary = await uploadImageCloudinary(
    avatar.tempFilePath,
    {
      folder: "AVATAR UPlOAD",
    }
  );

  console.log("file upload data is ", UploadAvatarOncloudinary);
  // POsting Resume
  const UploadResumeOnClodinary = await uploadImageCloudinary(
    resume.tempFilePath,
    {
      folder: "RESUME UPLOAD",
    }
  );
  console.log("resume upload data is ", UploadResumeOnClodinary);

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
  } = userdate;

  const user = await UserModel.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    facebookURL,
    linkedInURL,
    avatar: {
      public_id: UploadAvatarOncloudinary.public_id,
      url: UploadAvatarOncloudinary.secure_url,
    },
    resume: {
      public_id: UploadResumeOnClodinary.public_id,
      url: UploadResumeOnClodinary.secure_url,
    },
  });
  console.log("user is create is ", user);
  return user;
};

const userData = {
  fullName: "Jane Smith",
  email: "janesmith@example.com",
  phone: "+19876543210",
  aboutMe:
    "Creative graphic designer with 5 years of experience in digital and print media.",
  password: "supersecretpassword",
  portfolioURL: "https://portfolio.janesmith.com",
  githubURL: "https://github.com/janesmith",
  instagramURL: "https://instagram.com/janesmith",
  twitterURL: "https://twitter.com/janesmith",
  facebookURL: "https://facebook.com/janesmith",
  linkedInURL: "https://linkedin.com/in/janesmith",
  avatar: {
    public_id: "avatar_janesmith",
    url: "https://res.cloudinary.com/demo/image/upload/v1234567890/avatar_janesmith.jpg",
  },
  resume: {
    public_id: "resume_janesmith",
    url: "https://res.cloudinary.com/demo/image/upload/v1234567890/resume_janesmith.pdf",
  },
};

// CreateUser("d", userData);
export default {
  CreateUser,
};
