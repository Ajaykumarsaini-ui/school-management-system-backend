import mongoose from "mongoose";

const teacherleaveSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    teacher_name: {
        type: String,
        required: false,
    } ,
    fromDate: {
        type: Date,
        required: true,
    },

    toDate: {
        type: Date,
        required: true,
    },

    leaveReason: {
        type: String,
        required: true,
    },

    leaveStatus: {
        type: String,
        enum: ["approved", "rejected", "pending"],
        default: "pending",
    },
});

const TeacherLeave = mongoose.model("TeacherLeave", teacherleaveSchema);
export default TeacherLeave;