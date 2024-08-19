"use server";
import FacultyModel from "@/lib/schemas/faculty";
import facultyModel, { faculty, facultyDocument } from "../schemas/faculty";
import connectDB from "./DB";
import departmentModel from "../schemas/department";
import notificationModel from "../schemas/notification";

//CRUD operation
type ID = { id: string };
export type facultyType = faculty & ID;
/**
 * create a new faculty record in database
 */
export async function createFaculty(faculty: faculty) {
  try {
    await connectDB();
    let Faculty = new FacultyModel(faculty);
    await Faculty.save();
  } catch (error: any) {
    console.log(error.message);
  }
}

/**
 * fetches all faculty records in database
 */
export async function fetchFaculties(): Promise<facultyType[] | null> {
  try {
    await connectDB();
    let fetchFaculties = await FacultyModel.find();
    let faculties = fetchFaculties.map((faculty) => {
      return {
        id: faculty.id,
        name: faculty.name,
      };
    });
    return faculties;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}

/**
 * delete's a single id
 */
export async function deleteFaculty(id: string) {
  try {
    await connectDB();
    await facultyModel.deleteOne().where("_id").equals(id);
    await departmentModel.deleteMany().where("facultyID").equals(id);
    await notificationModel.deleteMany().where("facultyID").equals(id);
  } catch (error: any) {
    console.log(error.message);
  }
}

/**
 * updates a single record in database
 */
export async function updateFaculty(faculty: faculty & ID) {
  try {
    await connectDB();
    await facultyModel.updateOne({ _id: faculty.id }, faculty);
  } catch (error: any) {
    console.log(error.message);
  }
}
