import mongoose from "mongoose";

export interface notification {
  title: string;
  text: string;
  departmentID?: mongoose.Types.ObjectId;
  facultyID?: mongoose.Types.ObjectId;
  createdAt?: Date;
}
export interface notificationDocument extends mongoose.Document, notification {}

let schema = new mongoose.Schema<notification>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  departmentID: { type: mongoose.Schema.ObjectId, ref: "department" },
  facultyID: { type: mongoose.Schema.ObjectId, ref: "faculty" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let notificationModel =
  (mongoose.models.notification as mongoose.Model<notificationDocument>) || mongoose.model("notification", schema);
export default notificationModel;
