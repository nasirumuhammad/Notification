"use server";
import departmentModel, { departmentDocument } from "../schemas/department";
import notificationModel from "../schemas/notification";
import userModel from "../schemas/user";
import connectDB from "./DB";
import mongoose from "mongoose";
export type department = {
  id?: string;
  name: string;
  faculty: string;
};
//CRUD

/**
 * create a new department in database
 */
export async function createDepartment(departmentParam: department) {
  try {
    await connectDB();
    let department = new departmentModel(departmentParam);
    department.faculty = new mongoose.Types.ObjectId(department.faculty);
    await department.save();
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function fetchDepartment() {
  try {
    await connectDB();
    let fetchDepartments = await departmentModel.find();

    let departments = fetchDepartments.map((department) => {
      return {
        id: department.id as string,
        name: department.name,
      };
    });
    return departments;
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
}

export async function updateDepartment(department: department) {
  try {
    await connectDB();
    await departmentModel.updateOne({ _id: department.id }, department);
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function deleteDepartment(department: string) {
  try {
    connectDB();
    await userModel.deleteMany({
      department,
      role: "student",
    });
    await departmentModel.deleteOne().where("_id").equals(department);
    await notificationModel.deleteMany().where("department").equals(department);
  } catch (error: any) {
    console.log(error.message);
    return undefined;
  }
}
