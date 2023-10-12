import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: "true",
    });
    response.cookies.set("cookies", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
