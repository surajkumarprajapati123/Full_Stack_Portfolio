import catchAsyncErrors from "../middleware/catchAsync.js";
import UserService from "../service/userService.js";
import ApiResponse from "../utils/ApiResponce.js";

const RegisterUser = catchAsyncErrors(async (req, res) => {
  const user = await UserService.CreateUser(req, req.body);
  console.log("users");
  ApiResponse(res, 200, "User is created Successfully", user);
});

const UpdatedUser = catchAsyncErrors(async (req, res) => {
  const user = await UserService.UpdateProfile(req, req.user._id, req.body);
  // console.log("user controller is ", user);
  ApiResponse(res, 200, "User is updated Successfully", user);
});

const Login = catchAsyncErrors(async (req, res) => {
  const user = await UserService.login(res, req.body);
  ApiResponse(res, 200, "user login successsfully", user);
});

const logout = catchAsyncErrors(async (req, res) => {
  const user = await UserService.logout(req, res);
  ApiResponse(res, 200, "user logout successsfully", null);
});

const GetProfile = catchAsyncErrors(async (req, res) => {
  const user = await UserService.GetProfile(req.user._id);
  ApiResponse(res, 200, "profile fetched  successsfully", user);
});

const ForgatePassword = catchAsyncErrors(async (req, res) => {
  const user = await UserService.forgatePassword(req.body);
  ApiResponse(res, 200, `link send Registred email ${req.body.email}`, null);
});
const VerifyToken = catchAsyncErrors(async (req, res) => {
  const user = await UserService.VerifyToken(
    req.body,
    req.params.token
  );
  ApiResponse(res, 200, "Password change Successfully", user);
});

const changePassword = catchAsyncErrors(async (req, res) => {
  const user = await UserService.changePassword(
    req.user._id,
    req.body
  );
  ApiResponse(res, 200, "Password change Successfully", user);
});
export default {
  RegisterUser,
  Login,
  UpdatedUser,
  logout,
  GetProfile,
  ForgatePassword,
  VerifyToken,
  changePassword,
};
