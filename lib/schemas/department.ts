"use server";
import mongoose from "mongoose";
export interface department {
  name: string;
  faculty: mongoose.Types.ObjectId;
}
export interface departmentDocument extends mongoose.Document, department {}

let schema = new mongoose.Schema({
  name: { type: String, require: true },
  faculty: { type: mongoose.SchemaTypes.ObjectId, require: true, ref: "faculty" },
});

let departmentModel =
  (mongoose.models.department as mongoose.Model<departmentDocument>) || mongoose.model("department", schema);
export default departmentModel;
