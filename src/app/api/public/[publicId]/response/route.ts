import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Form from "@/models/Form";
import Response from "@/models/Response";

interface ContextParams {
  params: Promise<{ publicId: string }>;
}

export async function POST(req: NextRequest, context: ContextParams) {
  const params = await context.params;
  await connectToDatabase();
  const form = await Form.findOne({ publicId: params.publicId });
  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  const { answers } = await req.json();
  if (!Array.isArray(answers)) return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  const response = await Response.create({ form: form._id, answers });
  return NextResponse.json({ message: "Response submitted", responseId: response._id });
} 