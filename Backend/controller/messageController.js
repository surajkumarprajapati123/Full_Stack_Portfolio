import { catchAsyncErrors } from "../middleware/catchAsync.js";
import {
  DeleteSendMessage,
  FindAllSenderMesage,
  SendMessage,
  UpdateSenderMessage,
} from "../service/messageService.js";
import ApiResponse from "../utils/ApiResponce.js";

export const CreateSenderMessage = catchAsyncErrors(async (req, res) => {
  const message = await SendMessage(req.body);
  ApiResponse(res, 201, "Message is created", message);
});

export const UpdateSenderMessageC = catchAsyncErrors(async (req, res) => {
  const message = await UpdateSenderMessage(req.user._id, req.body);
  ApiResponse(res, 200, "Message is Updated Successfully", message);
});

export const DeleteSendMessageC = catchAsyncErrors(async (req, res) => {
  const message = await DeleteSendMessage(req.user._id);
  ApiResponse(res, 200, "Message  is Deleted Successfully", message);
});

export const FindAllMessage = catchAsyncErrors(async (req, res) => {
  const message = await FindAllSenderMesage();
  ApiResponse(res, 200, "All Data fetched successfully", message);
});
