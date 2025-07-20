import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Form from "@/models/Form";
export async function GET(req: NextRequest, context: any) {
  const params = await context.params;
  await connectToDatabase();
  const form = await Form.findOne({ _id: params.id });
  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  return NextResponse.json({ form });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description, questions, settings } = await req.json();
  const form = await Form.findOneAndUpdate(
    { _id: params.id, owner: (session.user as any).id },
    { title, description, questions, settings },
    { new: true }
  );
  if (!form) return NextResponse.json({ error: "Form not found or not authorized" }, { status: 404 });
  return NextResponse.json({ form });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await Form.findOneAndDelete({ _id: params.id, owner: (session.user as any).id });
  if (!form) return NextResponse.json({ error: "Form not found or not authorized" }, { status: 404 });
  return NextResponse.json({ message: "Form deleted" });
} 