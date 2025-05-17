import { useContext } from "react";
import { NewChatContext } from "../context/new-chat-provider";

export const useNewChat = () => {
  const ctx = useContext(NewChatContext);

  if (!ctx) {
    throw new Error("useNewChat must be used within a NewChatContext");
  }
  return ctx;
};
