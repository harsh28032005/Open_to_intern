import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const intern_schema = new mongoose.Schema(
  {
    name: { type: String, trim: true, lowercase: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    mobile: { type: Number, trim: true, unique: true, required: true },
    college_id: { type: ObjectId, ref: "college", default: null },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const intern = new mongoose.model("intern", intern_schema);

export default intern;
