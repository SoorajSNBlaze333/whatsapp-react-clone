import { NextResponse } from "next/server";

export async function GET() {
  const profile = {
    id: "9tkhacj",
    name: "Jimmy Mann",
    blueTickEnabled: true,
  };

  return NextResponse.json(profile);
}
