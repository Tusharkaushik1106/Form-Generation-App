import mongoose, { Schema, models } from "mongoose";

const QuestionSchema = new Schema({
  type: { type: String, required: true }, // text, paragraph, multiple_choice, checkbox, dropdown
  label: { type: String, required: true },
  options: [String], // for choice types
  required: { type: Boolean, default: false },
  section: { type: String },
});

const FormSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  questions: [QuestionSchema],
  settings: { type: Object },
  publicId: { type: String, unique: true },
}, { timestamps: true });

export default models.Form || mongoose.model("Form", FormSchema); 