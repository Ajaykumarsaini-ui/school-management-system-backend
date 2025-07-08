import mongoose from "mongoose";


const teachermessageSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    teacher_name: {
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

const TeacherMessage = mongoose.model("TeacherMessage", teachermessageSchema);
export default TeacherMessage;