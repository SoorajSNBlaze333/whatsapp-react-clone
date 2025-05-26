import { Message } from "@/app/context/chats-provider";
import { NextRequest, NextResponse } from "next/server";

const pageZeroMessages = [
  {
    contactId: "F66d8fn",
    message: "Hey! Great job on the UI",
    timestamp: 1747662290,
    isSentFromUser: false,
  },
  {
    contactId: "F66d8fn",
    message: "The client meeting went great!",
    timestamp: 1747662290,
    isSentFromUser: false,
  },
  {
    contactId: "F66d8fn",
    message: "Please send me the requirements",
    timestamp: 1747662290,
    isSentFromUser: true,
    delivered: true,
    sent: true,
    read: true,
  },
  {
    contactId: "F66d8fn",
    message: "These are the technical requirements",
    timestamp: 1747662290,
    isSentFromUser: false,
  },
  {
    contactId: "F66d8fn",
    message: "Please go through them in detail",
    timestamp: 1747662290,
    isSentFromUser: false,
  },
  {
    contactId: "F66d8fn",
    message: "Hi",
    timestamp: 1747662290,
    isSentFromUser: true,
    delivered: true,
    sent: true,
    read: true,
  },
  {
    contactId: "F66d8fn",
    message: "When do you want me to send the documents?",
    timestamp: 1747662290,
    isSentFromUser: true,
    delivered: true,
    sent: true,
    read: true,
    reactions: [
      {
        emoji: "😮",
        count: 1,
      },
    ],
  },
  {
    contactId: "F66d8fn",
    message: "Could you please send them by tomorrow?",
    timestamp: 1747662290,
    isSentFromUser: false,
    reactions: [
      {
        emoji: "👍🏼",
        count: 1,
      },
    ],
  },
  {
    contactId: "F66d8fn",
    message: "Looks like the client wants the build file",
    timestamp: 1747662290,
    isSentFromUser: false,
  },
];

const newPageMessages = [
  {
    contactId: "F66d8fn",
    message: "Hi",
    timestamp: 1747662290,
    isSentFromUser: true,
    delivered: true,
    sent: true,
    read: true,
  },
  {
    contactId: "F66d8fn",
    message: "When do you want me to send the documents?",
    timestamp: 1747662290,
    isSentFromUser: true,
    delivered: true,
    sent: true,
    read: true,
    reactions: [
      {
        emoji: "😮",
        count: 1,
      },
    ],
  },
  {
    contactId: "F66d8fn",
    message: "Could you please send them right now?",
    timestamp: 1747662290,
    isSentFromUser: false,
    reactions: [
      {
        emoji: "👍🏼",
        count: 1,
      },
    ],
  },
];

export async function GET(req: NextRequest) {
  const page = req?.nextUrl?.searchParams.get("page");
  let messages: Message[] = [];

  if (page === "0") {
    messages = [...pageZeroMessages];
  } else {
    messages = [...newPageMessages];
  }

  return NextResponse.json({ contactId: "F66d8fn", messages });
}
