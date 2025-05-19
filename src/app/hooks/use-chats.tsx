import { useContext } from "react";
import { ChatsContext } from "../context/chats-provider";

export const useChats = () => {
  const ctx = useContext(ChatsContext);

  if (!ctx) {
    throw new Error("useChats must be used within a ChatsProvider");
  }
  return ctx;
};
