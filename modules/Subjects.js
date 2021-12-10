// subjecty jsou tu hlavne kvuli barvam, budou se postupne pridavat pri pridani jakyhokoli ukolu
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    color: {
      type: String,
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
