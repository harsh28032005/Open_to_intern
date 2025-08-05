import mongoose from "mongoose";

const college_schema = new mongoose.Schema(
  {
    name: { type: String, trim: true, unique: true, required: true },
    full_name: { type: String, trim: true, required: true },
    logo_link: { type: String, trim: true, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const college = new mongoose.model("college", college_schema);

export default college;
