import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  teacher_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
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

  teacher_image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // assignedClass: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Class",
  //   required: true,
  // } ,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
