import { NextResponse } from "next/server";

export async function GET() {
  const chats = [
    {
      id: "8KERck9",
      contactId: "F66d8fn",
      read: true,
      group: false,
      favorite: true,
      messages: [
        {
          contactId: "F66d8fn",
          message: "Please send me the documents asap!",
          timestamp: 1747662290,
          isSentFromUser: false,
        },
      ],
    },
    {
      id: "052e1pz",
      contactId: "ZeEMJ5a",
      read: true,
      group: false,
      favorite: true,
      messages: [
        {
          contactId: "ZeEMJ5a",
          message: "Hey there!",
          timestamp: 1747662290,
          isSentFromUser: true,
          delivered: true,
          sent: true,
          read: true,
        },
      ],
    },
    {
      id: "o9tumiu",
      contactId: "HdoSv2h",
      read: true,
      group: false,
      favorite: true,
      messages: [
        {
          contactId: "HdoSv2h",
          message: "Hello!",
          timestamp: 1747662290,
          isSentFromUser: true,
          delivered: false,
          sent: true,
          read: false,
        },
      ],
    },
    {
      id: "r7zgvio",
      contactId: "pOtsxq8",
      read: false,
      group: false,
      favorite: true,
      messages: [
        {
          contactId: "pOtsxq8",
          message: "This is an urgent message!",
          timestamp: 1747662290,
          isSentFromUser: false,
        },
      ],
    },
    {
      id: "8ennzs2",
      contactId: "8KYNlgL",
      read: true,
      group: false,
      favorite: false,
      messages: [
        {
          contactId: "8KYNlgL",
          message: "This message won't send!",
          timestamp: 1747662290,
          isSentFromUser: true,
          sent: false,
        },
      ],
    },
    {
      id: "zm08t63",
      contactId: ["8KYNlgL", "LqN7Cf7", "c3xMk2F"],
      groupName: "Three of us",
      groupAvatar: "",
      read: true,
      group: true,
      favorite: true,
      messages: [
        {
          contactId: "8KYNlgL",
          message: "This message is from a group",
          timestamp: 1747662290,
          isSentFromUser: false,
        },
      ],
    },
  ];

  return NextResponse.json(chats);
}
