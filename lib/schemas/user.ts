"use server";
import departmentModel from "./department";
import mongoose from "mongoose";
enum ROLE {
  admin = "admin",
  student = "student",
}
interface User {
  name: string;
  email: string;
  password: string;
  department: mongoose.Types.ObjectId;
  role: ROLE;
}
interface UserModel extends mongoose.Document, User {}

let schema = new mongoose.Schema<User>({
  name: String,
  email: String,
  password: String,
  department: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: departmentModel.modelName,
  },
  role: String,
});

let userModel = (mongoose.models.user as mongoose.Model<UserModel>) || mongoose.model("user", schema);
export default userModel;
