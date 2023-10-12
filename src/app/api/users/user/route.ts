import { getUserDataFromToken } from "@/helpers/getUserDataFromToken";
import { connectDB } from "@/db/connectDB";
import User from "@/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
