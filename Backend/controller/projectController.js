import catchAsyncErrors from "../middleware/catchAsync.js";
import projectService from "../service/projectService.js";
import ApiResponse from "../utils/ApiResponce.js";

export const CreateSenderProject = catchAsyncErrors(async (req, res) => {
  const Project = await projectService.AddProject(req, req.body);
  ApiResponse(res, 201, "Project is created", Project);
});

export const UpdateSenderProjectC = catchAsyncErrors(async (req, res) => {
  const Project = await projectService.UpdateSenderProject(
    req,
    req.params.id,
    req.body
  );
  ApiResponse(res, 200, "Project is Updated Successfully", Project);
});

export const DeleteSendProjectC = catchAsyncErrors(async (req, res) => {
  const Project = await projectService.DeleteSendProject(req.params.id);
  ApiResponse(res, 200, "Project  is Deleted Successfully", Project);
});

export const FindAllProject = catchAsyncErrors(async (req, res) => {
  const Project = await projectService.FindAllSenderMesage();
  ApiResponse(res, 200, "All Data fetched successfully", Project);
});

export default {
  CreateSenderProject,
  UpdateSenderProjectC,
  DeleteSendProjectC,
  FindAllProject,
};
