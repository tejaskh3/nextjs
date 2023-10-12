import { connectDB } from "@/db/connectDB";
import ToDo from "@/models/ToDoSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { name, description } = reqBody;
    console.log(reqBody);

    // Create a todo and save it to the database
    const newToDo = new ToDo({ name, description });
    await newToDo.save();

    // Return the newly todo
    const response = NextResponse.json({ newToDo, message: "todo created" });
    console.log(response);
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
export const GET = async () => {
  try {
    const toDos = await ToDo.find({});
    return NextResponse.json({
      message: "get all to do",
      success: true,
      toDos,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
