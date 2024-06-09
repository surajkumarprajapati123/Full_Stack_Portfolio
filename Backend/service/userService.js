import UserModel from "../models/userModel";
const CreateUser = async (req, userdate) => {
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
  const { avatar, resume } = req.files;

  const user = await UserModel.create({});
};

export default {
  CreateUser,
};
