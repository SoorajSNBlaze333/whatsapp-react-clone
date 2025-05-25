import { NextResponse } from "next/server";

export async function GET() {
  const contacts = [
    {
      id: "F66d8fn",
      displayName: "Linnie Frazier",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "ZeEMJ5a",
      displayName: "Victoria Mason",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "HdoSv2h",
      displayName: "Lettie Graves",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "pOtsxq8",
      displayName: "Sue Saunders",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "8KYNlgL",
      displayName: "Alfred Howard",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "rYChRQg",
      displayName: "Maude Holloway",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "LqN7Cf7",
      displayName: "Isabella Burton",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "c3xMk2F",
      displayName: "Katherine Hines",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "wehzYOZ",
      displayName: "Olivia Alexander",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "4k3FCtC",
      displayName: "Lelia Bowman",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
    {
      id: "9tkhacj",
      displayName: "Jimmy Mann",
      contactAvatar: "",
      statusMessage: "Hey there, I am using App",
    },
  ];

  return NextResponse.json(contacts);
}
