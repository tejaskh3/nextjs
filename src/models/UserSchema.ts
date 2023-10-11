// import mongoose from "mongoose";

// interface IUser {
//   userName: string;
//   email: string;
//   password: string;
//   isVerified: boolean;
//   isAdmin: boolean;
//   forgotPasswordToken:String;
//   forgotPasswordTokenExpiry:Date;
//   verifyToken:String;
//   verifyTokenExpiry:Date;
// }

// const UserSchema = new mongoose.Schema({
//   userName: {
//     type: String,
//     required: true,
//     unique:true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique:true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isVerified:{
//     type:Boolean,
//     default:false,
//   },
//   isAdmin:{
//     type:Boolean,
//     default:false,
//   },
//   forgotPasswordToken:String,
//   forgotPasswordTokenExpiry:Date,
//   verifyToken:String,
//   verifyTokenExpiry:Date,
// });

// const User = mongoose.models.users || mongoose.model<IUser>("User", UserSchema);

// export default User;

import mongoose from "mongoose";

interface IUser {
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: String;
  forgotPasswordTokenExpiry: Date;
  verifyToken: String;
  verifyTokenExpiry: Date;
}

let User;
try {
  // Check if the model has already been compiled
  User = mongoose.model("User");
} catch {
  // If the model doesn't exist, define it
  const UserSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  });

  User = mongoose.model<IUser>("User", UserSchema);
}

export default User;
