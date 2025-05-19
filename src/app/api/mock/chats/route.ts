import { NextResponse } from "next/server";

export async function GET() {
  const chats = [
    {
      id: "8KERck9",
      contact: {
        id: "F66d8fn",
        name: "Linnie Frazier",
        avatar: "",
      },
      read: true,
      group: false,
      favorite: true,
      lastMessage: {
        message: "Please send me the documents asap!",
        timestamp: 1747662290,
        blueTickEnabled: true,
        read: true,
      },
    },
  ];

  return NextResponse.json(chats);
}
