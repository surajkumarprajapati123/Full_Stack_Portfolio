import ErrorHandler from "../middleware/error.js";
import { TimelineModel } from "../models/timeline.js";

export const AddTimeLine = async (TimeLineData) => {
  const { title, description, from, to } = TimeLineData;
  if (!title || !description) {
    throw new ErrorHandler("all field is required", 400);
  }
  const msg = await TimelineModel.create({
    title,
    description,
    timeline: {
      from,
      to,
    },
  });
  console.log("Send mesage is created", msg);
  return msg;
};

export const FindAllSenderMesage = async () => {
  const msg = await TimelineModel.find({});
  if (!msg) {
    throw new ErrorHandler("timeline  data is not fetcehd", 400);
  }
  console.log("all data", msg);
  return msg;
};

export const UpdateSenderTimeLine = async (timelineid, TimeLinedate) => {
  const { title, description, from, to } = TimeLinedate;

  let msg = await TimelineModel.findById({ _id: timelineid });
  if (!msg) {
    throw new ErrorHandler("TimeLine not found", 400);
  }
  msg = await TimelineModel.findByIdAndUpdate(
    { _id: timelineid },
    TimeLinedate,
    {
      new: true,
    }
  );
  console.log("Updated TimeLine", msg);

  return msg;
};
export const DeleteSendTimeLine = async (timelineid) => {
  let msg = await TimelineModel.findById({ _id: timelineid });
  if (!msg) {
    throw new ErrorHandler("TimeLine not found", 400);
  }
  msg = await TimelineModel.findByIdAndDelete(
    { _id: timelineid },
    { new: true }
  );
  console.log("Delete TimeLine", msg);

  return msg;
};

export default {
  AddTimeLine,
  FindAllSenderMesage,
  DeleteSendTimeLine,
  FindAllSenderMesage,
  UpdateSenderTimeLine,
};
