import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function requireAuth(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/auth/login");
  }
  return session;
}

export function requireRole(session: any, role: string) {
  if (!session || session.user.role !== role) {
    throw new Error("Unauthorized");
  }
} 