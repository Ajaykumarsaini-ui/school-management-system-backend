import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  subject_name: {
    type: String,
    required: true,
  },
  syllabusFile: {
    type: String,
    required: true,
  },

  subjectType: {
    type: String,
    required: true,
    enum: ["Core", "Elective"],
  },

  addclass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  add_class_name: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: false,
  },

  add_teacher_name: {
    type: String,
    required: false,
  },



  subject_code: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//   subjectSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
