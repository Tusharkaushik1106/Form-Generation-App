import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/auth/login");
  }
  return session;
}

export function requireRole(session: Session, role: string) {
  if (!session || session.user.role !== role) {
    throw new Error("Unauthorized");
  }
} 