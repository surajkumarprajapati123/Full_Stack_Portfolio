import catchAsyncErrors from "../middleware/catchAsync.js";
import softwareService from "../service/softwareService.js";
import ApiResponse from "../utils/ApiResponce.js";

export const CreateSenderSoftware = catchAsyncErrors(async (req, res) => {
  const Software = await softwareService.Addsoftware(req, req.body);
  ApiResponse(res, 201, "Software is created", Software);
});

export const UpdateSenderSoftwareC = catchAsyncErrors(async (req, res) => {
  const Software = await softwareService.UpdateSendersoftware(
    req,
    req.params.id,
    req.body
  );
  ApiResponse(res, 200, "Software is Updated Successfully", Software);
});

export const DeleteSendSoftwareC = catchAsyncErrors(async (req, res) => {
  const Software = await softwareService.DeleteSendsoftware(req.params.id);
  ApiResponse(res, 200, "Software  is Deleted Successfully", Software);
});

export const FindAllSoftware = catchAsyncErrors(async (req, res) => {
  const Software = await softwareService.FindAllSenderMesage();
  ApiResponse(res, 200, "All Data fetched successfully", Software);
});

export default {
  CreateSenderSoftware,
  UpdateSenderSoftwareC,
  DeleteSendSoftwareC,
  FindAllSoftware,
};
