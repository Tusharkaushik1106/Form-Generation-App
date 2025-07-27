import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Form from "@/models/Form";

interface ContextParams {
  params: Promise<{ publicId: string }>;
}

export async function GET(req: NextRequest, context: ContextParams) {
  const params = await context.params;
  await connectToDatabase();
  const form = await Form.findOne({ publicId: params.publicId }).select("-owner");
  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  return NextResponse.json({ form });
} 