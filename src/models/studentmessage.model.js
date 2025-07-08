import mongoose from "mongoose";


const studentmessageSchema = new mongoose.Schema({
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
    student_name: {
        type: String,
        required: false,
    } ,
    message: {
        type: String,
        required: true,
    },
    attachment: {
        type: String,
        required: false,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

}, {
    timestamps: true
}
);

const StudentMessage = mongoose.model("StudentMessage", studentmessageSchema);
export default StudentMessage;