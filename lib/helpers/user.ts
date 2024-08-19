"use server";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import connectDB from "./DB";
import userModel from "../schemas/user";
import { departmentDocument } from "../schemas/department";

enum ROLE {
  admin = "admin",
  student = "student",
}
interface user {
  name: string;
  department?: string;
  email: string;
  password: string;
  role: ROLE;
}
export async function createUser(userInfo: user) {
  try {
    await connectDB();
    await userModel.create(userInfo);
  } catch (error: any) {
    console.log(error.message);
  }
}
export async function fetchUser(email: string) {
  try {
    await connectDB();
    let fetchUser = await userModel
      .findOne({ email })
      .populate<{ department: departmentDocument }>("department")
      .orFail();
    return {
      id: fetchUser?.id,
      name: fetchUser?.name,
      department: fetchUser.department.name,
    };
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
}
