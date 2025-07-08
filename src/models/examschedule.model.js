import mongoose from "mongoose";

const examScheduleSchema = new mongoose.Schema(
    {
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
            required: true,
        },
        class_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
        class_name: {
            type: String,
            required: true,
        },

        section: {
            type: String,
            required: true,
        },
        subject_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        exam_date: {
            type: Date,
            required: true,
        },
        start_time: {
            type: String,
            required: true,
        },
        end_time: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

examScheduleSchema.index({
    school: 1,
    class_id: 1,
    exam_date: 1,
});

const ExamSchedule = mongoose.model("ExamSchedule", examScheduleSchema);

export default ExamSchedule;
