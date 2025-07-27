import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Form from "@/models/Form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest, context: any) {
  const params = await context.params;
  await connectToDatabase();
  const form = await Form.findOne({ _id: params.id });
  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  return NextResponse.json({ form });
}

export async function PUT(req: NextRequest, context: any) {
  const params = await context.params;
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

export async function DELETE(req: NextRequest, context: any) {
  const params = await context.params;
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  
  if (!session) {
    console.log("No session found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  console.log("Session user:", session.user);
  console.log("Form ID to delete:", params.id);
  
  try {
    const form = await Form.findOne({ _id: params.id, owner: (session.user as any).id });
    console.log("Found form:", form);
    
    if (!form) {
      // Check if form exists but user doesn't own it
      const existingForm = await Form.findOne({ _id: params.id });
      if (existingForm) {
        console.log("Form exists but user doesn't own it. Owner:", existingForm.owner, "User:", (session.user as any).id);
        return NextResponse.json({ error: "Not authorized to delete this form" }, { status: 403 });
      }
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    
    const deletedForm = await Form.findOneAndDelete({ _id: params.id, owner: (session.user as any).id });
    console.log("Deleted form:", deletedForm);
    
    if (!deletedForm) {
      return NextResponse.json({ error: "Failed to delete form" }, { status: 500 });
    }
    
    return NextResponse.json({ message: "Form deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 