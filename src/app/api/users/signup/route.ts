import { connectDB } from "@/db/connectDB";
import User from "@/models/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    // Check if a user with the same email already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ message: "User already exists." });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and save it to the database
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    // Return the newly created user (if needed)
    const response = NextResponse.json({ newUser, message: "user created" });
    console.log(response);
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
