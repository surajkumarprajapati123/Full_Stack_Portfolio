import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      default: "forgot password",
    },
    expires: {
      type: Date,
      // default: () => Date.now() + 10 * 60 * 1000, // 10 minutes from now
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("Token", TokenSchema);
export default TokenModel;
