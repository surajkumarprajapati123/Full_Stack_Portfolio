import ErrorHandler from "../middleware/error.js";
import TokenModel from "../models/tokenModle.js";
import UserModel from "../models/userModel.js";
import uploadImageCloudinary from "../utils/cloudinary.js";
import deleteFileFromCloudinary from "../utils/deleteImageCloudunary.js";
import randomstring from "randomstring";
import SendMailPasswordForgate from "./SendingMailForUser.js";
import bcrypt from "bcrypt";

const GenerateAccessTokenAndRefreshToken = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ErrorHandler("User not found not generate token ", 401);
  }
  const AccessToken = user.generateAccessToken();
  const RefreshToken = user.generateRefreshToken();
  return { AccessToken, RefreshToken };
};

const CreateUser = async (req, userdate) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new ErrorHandler("Avatar Required!", 400);
  }
  const { avatar, resume } = req.files;

  // POSTING Avatar

  const UploadAvatarOncloudinary = await uploadImageCloudinary(
    avatar.tempFilePath,
    {
      folder: "AVATAR UPlOAD",
    }
  );

  // console.log("file upload data is ", UploadAvatarOncloudinary);
  // POsting Resume
  const UploadResumeOnClodinary = await uploadImageCloudinary(
    resume.tempFilePath,
    {
      folder: "RESUME UPLOAD",
    }
  );
  // console.log("resume upload data is ", UploadResumeOnClodinary);

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

const GetProfile = async (userid) => {
  const user = await UserModel.findById(userid);
  // console.log("find user is ", user);
  return user;
};

const login = async (res, userdate) => {
  // console.log("working1");
  const { email, password } = userdate;

  if (!email || !password) {
    throw new ErrorHandler("Please enter the email and password", 401);
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Validate the email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  let user = await UserModel.findOne({ email });
  if (!user) {
    throw new ErrorHandler("User not found", 401);
  }

  // Await the password comparison
  const passwordMatch = await user.comparePassword(password);
  // console.log("chack oassword ", passwordMatch);
  if (!passwordMatch) {
    throw new ErrorHandler("Password does not match", 401);
  }

  const option = {
    httpOnly: true,
    secure: false,
  };

  const { AccessToken, RefreshToken } =
    await GenerateAccessTokenAndRefreshToken(user._id);
  // console.log("Access is ", AccessToken);
  // console.log("Refresh is ", RefreshToken);

  res.cookie("accessToken", AccessToken, option);
  res.cookie("refreshToken", RefreshToken, option);
  // console.log("user is ", user);

  return { accessToken: AccessToken, refreshToken: RefreshToken };
};

const logout = async (req, res) => {
  const option = {
    httpOnly: true,
    secure: false,
  };
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    throw new ErrorHandler("Not authorized", 401);
  }
  res.cookie("accessToken", "", option);
  res.cookie("refreshToken", "", option);

  return user;
};

const UpdateProfile = async (req, userId, userData) => {
  const { resume, avatar } = req.files;
  try {
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
    } = userData;

    if (password) {
      throw new ErrorHandler("Password can't be changed", 401);
    }

    // Initialize the update object
    let updateData = {
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
    };

    // Handle avatar upload if present
    if (req.files && req.files.avatar) {
      const user = await UserModel.findById(userId);
      if (user.avatar && user.avatar.public_id) {
        // Delete the old avatar from Cloudinary
        await deleteFileFromCloudinary(user.avatar.public_id);
      }

      // Upload the new avatar to Cloudinary
      const UploadAvatarOncloudinary = await uploadImageCloudinary(
        avatar.tempFilePath,
        {
          folder: "AVATAR UPlOAD",
        }
      );
      // console.log("updateing resulte", UploadAvatarOncloudinary);

      updateData.avatar = {
        public_id: UploadAvatarOncloudinary.public_id,
        url: UploadAvatarOncloudinary.secure_url,
      };
    }
    // handel resume data
    if (req.files && req.files.resume) {
      const user = await UserModel.findById(userId);
      if (user.resume && user.resume.public_id) {
        // Delete the old avatar from Cloudinary
        await deleteFileFromCloudinary(user.resume.public_id);
      }
      const UploadResumeOnClodinary = await uploadImageCloudinary(
        resume.tempFilePath,
        {
          folder: "RESUME UPLOAD",
        }
      );
      // console.log("cloudinary data is ", UploadResumeOnClodinary);
      // const result = await uploadImageCloudinary(req.files.resume.path);
      updateData.resume = {
        public_id: UploadResumeOnClodinary.public_id,
        url: UploadResumeOnClodinary.secure_url,
      };
    }

    // Update the user document in the database
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    // Return the updated user
    console.log("updated user ", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Error updating profile");
  }
};

const forgatePassword = async (userdate) => {
  const { email } = userdate;

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email) {
    throw new Error("Please enter the email address");
  }

  // Validate the email format
  if (!emailRegex.test(email)) {
    throw new ErrorHandler("Invalid email format", 401);
  }

  let user = await UserModel.findOne({ email });

  if (!user) {
    throw new ErrorHandler("User is not found", 401);
  }

  const randomString = randomstring.generate({
    length: 150,
    charset: ["hex"],
  });
  const resetTokenExpiration = Date.now() + 10 * 60 * 1000;
  const findTokenUser = await TokenModel.findOne({ userid: user._id });
  if (findTokenUser) {
    (findTokenUser.token = randomString),
      (findTokenUser.expires = resetTokenExpiration),
      findTokenUser.save();
  } else {
    await TokenModel.create({
      userid: user._id,
      token: randomString,
      expires: resetTokenExpiration,
    });
    if (findTokenUser && Date.now() > findTokenUser.expires) {
      throw new ErrorHandler("Token time expires  Send again", 401);
    }
  }
  await SendMailPasswordForgate(email, randomString);

  return { message: `link send Registered email ${email}` };
};

const VerifyToken = async (passwordData, token) => {
  try {
    // Check if token is provided
    if (!token) {
      throw new ErrorHandler("Please provide a token", 401);
    }

    // Extract password from passwordData
    const { password } = passwordData;
    if (!password) {
      throw new ErrorHandler("Enter the Password", 401);
    }

    // Find token in database
    const decodedToken = await TokenModel.findOne({ token });
    if (!decodedToken) {
      throw new ErrorHandler("Token is invalid", 401);
    }

    // Log current time and decoded token time
    // console.log("Current time: ", new Date());
    // console.log("Token expiry time: ", new Date(decodedToken.expires));

    // Check if token has expired
    if (Date.now() > decodedToken.expires) {
      decodedToken.blacklisted = true;
      await decodedToken.save();
      throw new ErrorHandler(
        "Token has expired, please request a new one",
        401
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    const userId = decodedToken.user;
    const user = await UserModel.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    // Check if user exists
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    // Return the updated user
    return user;
  } catch (error) {
    // Handle errors

    console.log("error is ", error); // Re-throw other errors
  }
};

const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    // Validate the input parameters
    if (!oldPassword || !newPassword) {
      throw new ErrorHandler(
        "Please enter both the old password and the new password",
        401
      );
    }

    // Find the user by their ID
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }

    // Check if the old password matches the user's current password
    const isPasswordMatch = await user.comparePassword(oldPassword);
    if (!isPasswordMatch) {
      throw new ErrorHandler("Old password is not matched", 401);
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return { message: "Password changed successfully" };
  } catch (error) {
    console.error("Error in changePassword function:", error);
    throw error;
  }
};

export default {
  CreateUser,
  GetProfile,
  UpdateProfile,
  login,
  logout,
  VerifyToken,
  forgatePassword,
  changePassword,
};
