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
      contactId: ["8KYNlgL", "LqN7Cf7", "9tkhacj"],
      groupName: "Three of us",
      groupAvatar: "",
      read: true,
      group: true,
      favorite: true,
      messages: [
        {
          contactId: "9tkhacj",
          message: "This message is from Me",
          timestamp: 1747662290,
          isSentFromUser: true,
          sent: true,
          delivered: true,
          read: false,
        },
        {
          contactId: "8KYNlgL",
          message: "This message is from a Alfred",
          timestamp: 1747662290,
          isSentFromUser: false,
        },
        {
          contactId: "LqN7Cf7",
          message: "This message is from Isabella",
          timestamp: 1747662290,
          isSentFromUser: false,
        },
      ],
    },
  ];

  return NextResponse.json(chats);
}
