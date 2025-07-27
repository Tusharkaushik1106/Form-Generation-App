import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import Form from "@/models/Form";
import Response from "@/models/Response";

interface ContextParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: ContextParams) {
  const params = await context.params;
  await connectToDatabase();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await Form.findOne({ _id: params.id, owner: token.sub });
  if (!form) return NextResponse.json({ error: "Form not found or not authorized" }, { status: 404 });
  const responses = await Response.find({ form: form._id }).sort({ submittedAt: -1 });
  return NextResponse.json({ responses });
} 