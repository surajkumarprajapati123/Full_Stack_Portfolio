import ErrorHandler from "../middleware/error.js";
import { MessageModel } from "../models/messageModle.js";

export const SendMessage = async (messageData) => {
  const { senderName, message, subject } = messageData;
  if (!senderName || !message || !subject) {
    throw new ErrorHandler("all field is required", 400);
  }
  const msg = await MessageModel.create({
    senderName,
    message,
    subject,
  });
  // console.log("Send mesage is created", msg);
  return msg;
};

export const FindAllSenderMesage = async () => {
  const msg = await MessageModel.find({});
  if (!msg) {
    throw new ErrorHandler("message data is not fetcehd", 400);
  }
  // console.log("all data", msg);
  return msg;
};

export const UpdateSenderMessage = async (userid, messagedate) => {
  const { senderName, message, subject } = messagedate;

  let msg = await MessageModel.findById({ _id: userid });
  if (!msg) {
    throw new ErrorHandler("Message not found", 400);
  }
  msg = await MessageModel.findByIdAndUpdate({ _id: userid }, messagedate, {
    new: true,
  });
  // console.log("Updated message", msg);

  return msg;
};
export const DeleteSendMessage = async (userid) => {
  let msg = await MessageModel.findById({ _id: userid });
  if (!msg) {
    throw new ErrorHandler("Message not found", 400);
  }
  msg = await MessageModel.findByIdAndDelete({ _id: userid }, { new: true });
  // console.log("Delete message", msg);

  return msg;
};

export default {
  SendMessage,
  DeleteSendMessage,
  UpdateSenderMessage,
  FindAllSenderMesage
}