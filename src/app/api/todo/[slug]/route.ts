import { connectDB } from "@/db/connectDB";
import ToDo from "@/models/ToDoSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import axios from "axios";
import { getUserDataFromToken } from "@/helpers/getUserDataFromToken";
connectDB();

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const taskID = params.slug;
    const task = await ToDo.findById(taskID);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await ToDo.deleteOne({ _id: taskID });

    return NextResponse.json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    const taskID = params.slug;
    const reqBody = request.json();
    const response = await ToDo.findOneAndUpdate({ _id: taskID }, reqBody);
    return NextResponse.json({
      message: "to do updated",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
