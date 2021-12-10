import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 255,
      min: 2,
    },
    calendarData: [
      [
        {
          lesson: {
            BeginTime: String,
            EndTime: String,
          },
          subject: {
            Abbrev: String,
            Name: String,
          },
        },
      ],
    ],
    refreshBakalariToken: String,
    createdByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Group", groupSchema);
