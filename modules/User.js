import mongoose  from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },

    verifiedDevices: [String],
    expotoken: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
