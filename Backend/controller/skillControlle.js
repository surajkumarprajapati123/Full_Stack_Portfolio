import catchAsyncErrors from "../middleware/catchAsync.js";
import skillService from "../service/skillService.js";
import ApiResponse from "../utils/ApiResponce.js";

export const CreateSenderskill = catchAsyncErrors(async (req, res) => {
  const skill = await skillService.Addskill(req, req.body);
  ApiResponse(res, 201, "skill is created", skill);
});

export const UpdateSenderskillC = catchAsyncErrors(async (req, res) => {
  const skill = await skillService.UpdateSenderskill(
    req,
    req.params.id,
    req.body
  );
  ApiResponse(res, 200, "skill is Updated Successfully", skill);
});

export const DeleteSendskillC = catchAsyncErrors(async (req, res) => {
  const skill = await skillService.DeleteSendskill(req.params.id);
  ApiResponse(res, 200, "skill  is Deleted Successfully", skill);
});

export const FindAllskill = catchAsyncErrors(async (req, res) => {
  const skill = await skillService.FindAllSenderMesage();
  ApiResponse(res, 200, "All Data fetched successfully", skill);
});

export default {
  CreateSenderskill,
  UpdateSenderskillC,
  DeleteSendskillC,
  FindAllskill,
};
