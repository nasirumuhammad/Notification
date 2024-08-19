import mongoose from "mongoose";

interface Department extends mongoose.Document {
  name: string;
  faculty: mongoose.Types.ObjectId;
  getName: () => void;
}

interface DepartmentModel extends mongoose.Model<Department> {
  // Define any static methods for the model here if needed
}

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  faculty: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "faculty",
  },
});

departmentSchema.methods.getName = function () {
  console.log(this);
};

const Department =
  (mongoose.models.Department as DepartmentModel) ||
  mongoose.model<Department, DepartmentModel>("Department", departmentSchema);

// Using async/await
(async () => {
  const test = await Department.findOne({ name: "muhammad" }).exec();
  if (test) {
    test.getName();
  }
})();
