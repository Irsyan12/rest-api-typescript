import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String, default: "" },
    password: { type: String, default: "" },
    role: { type: String, default: "regular" },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
