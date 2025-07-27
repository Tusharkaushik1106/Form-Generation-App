import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import Form from "@/models/Form";
export async function GET(req: NextRequest) {
  await connectToDatabase();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const forms = await Form.find({ owner: token.sub }).sort({ updatedAt: -1 });
  return NextResponse.json({ forms });
}
export async function POST(req: NextRequest) {
  await connectToDatabase();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description, questions, settings } = await req.json();
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const form = await Form.create({
    title,
    description,
    questions,
    settings,
    owner: token.sub,
    publicId: Math.random().toString(36).substring(2, 10),
  });
  return NextResponse.json({ form });
} 