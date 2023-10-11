import { connectDB } from "@/db/connectDB";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserSchema";
import jwt from "jsonwebtoken";
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //checking if the user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user didn't exist" }, { status: 400 });
    }

    // checking password if user exist
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "password didn't match" },
        { status: 400 }
      );
    }

    // creating jwt token using tokenData
    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });
    response.cookies.set("cookies", token, {
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
};

// export const POST = async (r:NextRequest) =>{
//   return NextRequest.json('this is tejas testng api');
// }
