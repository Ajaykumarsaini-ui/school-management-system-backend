import mongoose from "mongoose";

const examinationSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  examDate: {
    type: Date,
    required: true,
  } ,

  examType: {
    type: String,
    required: true,
  } ,
//   startTime: {
//     type: Date,
//     required: true,
//   },
//   endTime: {
//     type: Date,
//     required: true,
//   },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Examination = mongoose.model("Examination", examinationSchema);
export default Examination;
