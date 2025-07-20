import mongoose, { Schema, models } from "mongoose";

const AnswerSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, required: true },
  value: Schema.Types.Mixed,
});

const ResponseSchema = new Schema({
  form: { type: Schema.Types.ObjectId, ref: "Form", required: true },
  answers: [AnswerSchema],
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default models.Response || mongoose.model("Response", ResponseSchema); 