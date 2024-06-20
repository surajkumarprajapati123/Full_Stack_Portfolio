import catchAsyncErrors from "../middleware/catchAsync.js";
import softwareService from "../service/softwareService.js";

import ApiResponse from "../utils/ApiResponce.js";

export const CreateSenderTimeLine = catchAsyncErrors(async (req, res) => {
  const TimeLine = await softwareService.Addsoftware(req, req.body);
  ApiResponse(res, 201, "TimeLine is created", TimeLine);
});

export const UpdateSenderTimeLineC = catchAsyncErrors(async (req, res) => {
  const TimeLine = await softwareService.UpdateSendersoftware(
    req,
    req.params.id,
    req.body
  );
  ApiResponse(res, 200, "TimeLine is Updated Successfully", TimeLine);
});

export const DeleteSendTimeLineC = catchAsyncErrors(async (req, res) => {
  const TimeLine = await softwareService.DeleteSendsoftware(req.params.id);
  ApiResponse(res, 200, "TimeLine  is Deleted Successfully", TimeLine);
});

export const FindAllTimeLine = catchAsyncErrors(async (req, res) => {
  const TimeLine = await softwareService.FindAllSenderMesage();
  ApiResponse(res, 200, "All Data fetched successfully", TimeLine);
});

export default {
  CreateSenderTimeLine,
  UpdateSenderTimeLineC,
  DeleteSendTimeLineC,
  FindAllTimeLine,
};
