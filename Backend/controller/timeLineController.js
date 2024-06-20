import catchAsyncErrors from "../middleware/catchAsync.js";
import timelineService from "../service/timelineService.js";

import ApiResponse from "../utils/ApiResponce.js";

export const CreateSenderTimeLine = catchAsyncErrors(async (req, res) => {
  const TimeLine = await timelineService.AddTimeLine(req.body);
  ApiResponse(res, 201, "TimeLine is created", TimeLine);
});

export const UpdateSenderTimeLineC = catchAsyncErrors(async (req, res) => {
  const TimeLine = await timelineService.UpdateSenderTimeLine(
    req.params.id,
    req.body
  );
  ApiResponse(res, 200, "TimeLine is Updated Successfully", TimeLine);
});

export const DeleteSendTimeLineC = catchAsyncErrors(async (req, res) => {
  const TimeLine = await timelineService.DeleteSendTimeLine(req.params.id);
  ApiResponse(res, 200, "TimeLine  is Deleted Successfully", TimeLine);
});

export const FindAllTimeLine = catchAsyncErrors(async (req, res) => {
  const TimeLine = await timelineService.FindAllSenderMesage();
  ApiResponse(res, 200, "All Data fetched successfully", TimeLine);
});

export default {
  CreateSenderTimeLine,
  UpdateSenderTimeLineC,
  DeleteSendTimeLineC,
  FindAllTimeLine,
};
