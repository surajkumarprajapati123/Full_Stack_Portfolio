import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import catchAsyncErrors from "./catchAsync.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // const { accessToken } = req.cookies;
  const { accessToken } =
    req.cookies || req.header("Authorization")?.replace("Bearer ", "");

  // console.log("token is ", accessToken);
  if (!accessToken) {
    return next(new ErrorHandler("User not Authenticated!", 400));
  }
  const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
  // console.log("decoded token is ", decoded);
  req.user = await UserModel.findById(decoded.id);
  // console.log("user is ", req.user);
  next();
});
