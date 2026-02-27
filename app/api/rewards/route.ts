import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, points: 0 });
}

export async function POST() {
  return NextResponse.json({ success: true });
}
