import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const studentSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  student_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  student_class: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Class",
    // required: true,
    type: Number,
    required: true,
  },
  student_class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  student_image: {
    type: String,
    required: true,
  },
  guardian_name: {
    type: String,
    required: true,
  },
  guardian_phone: {
    type: String,
    required: true,
  },

  student_password: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["enrolled", "not-enrolled"],
    default: "enrolled",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  refreshToken: {
    type: String,
    required: false,
  },
});

studentSchema.plugin(mongoosePaginate);

const Student = mongoose.model("Student", studentSchema);
export default Student;
