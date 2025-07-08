import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    studentClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    present: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },
    teacher_name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Ensure unique attendance per student per date
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
