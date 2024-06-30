import catchAsyncErrors from "../middleware/catchAsync.js";
import messageService from "../service/messageService.js";
import ApiResponse from "../utils/ApiResponce.js";

export const CreateSenderMessage = catchAsyncErrors(async (req, res) => {
  const message = await messageService.SendMessage(req.body);
  ApiResponse(res, 201, "Message is created", message);
});

export const UpdateSenderMessageC = catchAsyncErrors(async (req, res) => {
  const message = await messageService.UpdateSenderMessage(req.params.id, req.body);
  ApiResponse(res, 200, "Message is Updated Successfully", message);
});

export const DeleteSendMessageC = catchAsyncErrors(async (req, res) => {
  const message = await messageService.DeleteSendMessage(req.params.id);
  ApiResponse(res, 200, "Message  is Deleted Successfully", message);
});

export const FindAllMessage = catchAsyncErrors(async (req, res) => {
  const message = await messageService.FindAllSenderMesage();
  ApiResponse(res, 200, "All Data fetched successfully", message);
});

export default {
  CreateSenderMessage,
  FindAllMessage,
  DeleteSendMessageC,
  UpdateSenderMessageC
}
