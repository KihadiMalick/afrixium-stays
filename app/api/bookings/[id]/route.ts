import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ success: true, id: params.id });
}

export async function PATCH() {
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  return NextResponse.json({ success: true });
}
