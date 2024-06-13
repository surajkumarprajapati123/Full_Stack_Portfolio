import catchAsyncErrors from "../middleware/catchAsync.js";
import UserService from "../service/userService.js";

const RegisterUser = catchAsyncErrors(async (req, res) => {
  const user = await UserService.CreateUser(req, req.body);
  console.log("users");
  ApiResponse(res, 200, "User is created Successfully", user);
});

export default {
  RegisterUser,
};
