import { NextResponse } from "next/server";

export async function GET() {
  const profile = {
    id: "9tkhacj",
    name: "Jimmy Mann",
    blueTickEnabled: true,
    avatarUrl: "/mh.jpg",
  };

  return NextResponse.json(profile);
}
