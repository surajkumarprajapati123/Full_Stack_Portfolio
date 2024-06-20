import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name Required!"],
    },
    email: {
      type: String,

      required: [true, "Email Required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone Required!"],
    },
    aboutMe: {
      type: String,
      required: [true, "About Me Section Is Required!"],
    },
    password: {
      type: String,
      required: [true, "Password Required!"],
      minLength: [8, "Password Must Contain At Least 8 Characters!"],
      // select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    portfolioURL: {
      type: String,
      required: [true, "Portfolio URL Required!"],
    },
    githubURL: {
      type: String,
    },
    instagramURL: {
      type: String,
    },
    twitterURL: {
      type: String,
    },
    linkedInURL: {
      type: String,
    },
    facebookURL: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  const matchpassword = await bcrypt.compare(enteredPassword, this.password);
  // console.log("mathpassword form model ", matchpassword);
  return matchpassword;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
  });
};
console.log("process.env.JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);
//Generating Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and Adding Reset Password Token To UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Setting Reset Password Token Expiry Time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
