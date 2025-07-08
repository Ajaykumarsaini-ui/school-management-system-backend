import mongoose from "mongoose";

const studentleaveSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    student_name: {
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

const StudentLeave = mongoose.model("StudentLeave", studentleaveSchema);
export default StudentLeave;