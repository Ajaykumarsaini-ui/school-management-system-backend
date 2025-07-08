import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },

  class_text: {
    type: String,
    required: true,
  },
  class_num: {
    type: Number,
    required: true,
  },
  class_subjects: {
    type: Number,
    required: true,
  },
  class_students: {
    type: Number,
    required: true,
  },
  attendee: {
    type: String,
    required: true,
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: false,
  },



  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Class = mongoose.model("Class", classSchema);

export default Class;
