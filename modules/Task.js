import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    index: Number, 
    description: String,
    date: {
      year: Number,
      month: Number,
      day: Number,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",mongoos
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: "homework" | "test",
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
