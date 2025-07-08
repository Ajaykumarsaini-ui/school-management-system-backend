import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  audience: {
    type: String,
    enum: ["student", "teacher", "all"],
    required: true,
  },
  attachment: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
