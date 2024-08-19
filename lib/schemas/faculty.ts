"use server";
import mongoose from "mongoose";

export interface faculty {
  name: string;
}
export interface facultyDocument extends mongoose.Document, faculty {}

let schema = new mongoose.Schema<faculty>({
  name: {
    type: String,
    required: true,
  },
});

let facultyModel = (mongoose.models.faculty as mongoose.Model<facultyDocument>) || mongoose.model("faculty", schema);
export default facultyModel;
