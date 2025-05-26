import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Chat, Message } from "./chats-provider";
import { useChats } from "../hooks/use-chats";
import { useContacts } from "../hooks/use-contacts";
import { Contact } from "./contacts-provider";
import { getTimestamp } from "../utils";

export type CurrentChatContacts = {
  [contactId: string]: Contact | undefined;
};

export type CurrentChatContactsGroup = {
  name: string;
  avatar: string;
  contacts: CurrentChatContacts;
};

export type CurrentChatData = {
  chatId: string | null;
  contact: Contact | null;
  messages: Message[];
  group: CurrentChatContactsGroup | null;
  page: number;
  isLoading: boolean;
};

export type CurrentChat = CurrentChatData & {
  loadCurrentChat: (chat: Partial<CurrentChatData>) => void;
  addNewMessage: () => void;
};

export const CurrentChatContext = createContext<undefined | CurrentChat>(
  undefined
);

export default function CurrentChatProvider({ children }: PropsWithChildren) {
  const [currentChat, setCurrentChat] = useState<CurrentChatData>({
    chatId: null,
    contact: null,
    messages: [],
    group: null,
    page: 0,
    isLoading: false,
  });
  const {
    chats: { complete },
  } = useChats();
  const { contacts, setIsContactTyping } = useContacts();

  useEffect(() => {
    const fetchMessages = async () => {
      setCurrentChat((prev) => ({ ...prev, isLoading: true }));
      const response = await fetch(
        `/api/mock/messages?page=${currentChat.page}`
      );
      const data = await response.json();
      setCurrentChat((prev) => ({
        ...prev,
        messages:
          data.contactId === prev.contact?.id
            ? currentChat.page > 0
              ? [...data.messages, ...prev.messages]
              : [...data.messages]
            : [...prev.messages],
        isLoading: false,
      }));
    };

    fetchMessages();
  }, [currentChat.chatId, currentChat.page]);

  useEffect(() => {
    const chat = complete.find((chat: Chat) => chat.id === currentChat.chatId);
    if (chat) {
      if (typeof chat.contactId == "string") {
        const contactId = chat.contactId;
        const contact = contacts.find(
          (contact: Contact) => contact.id === contactId
        );
        if (contact) {
          setCurrentChat((prev) => ({
            ...prev,
            contact,
            group: null,
          }));
        }
      } else {
        const groupContacts: CurrentChatContacts = {};
        chat.contactId.forEach((groupContact: string) => {
          groupContacts[groupContact] = contacts.find(
            (contact: Contact) => contact.id === groupContact
          );
        });
        setCurrentChat((prev) => ({
          ...prev,
          contact: null,
          group: {
            name: chat.groupName ?? "",
            avatar: chat.groupAvatar ?? "",
            contacts: groupContacts,
          },
        }));
      }
    }
  }, [complete, contacts, currentChat.chatId]);

  const loadCurrentChat = (chat: Partial<CurrentChat>) => {
    setCurrentChat((prev) => ({
      ...prev,
      ...chat,
    }));
  };

  const addNewMessage = () => {
    if (currentChat.contact) {
      const contactId = currentChat.contact?.id;

      setIsContactTyping(contactId, true);
      setCurrentChat((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            contactId,
            message: "Hey!",
            timestamp: getTimestamp(),
            isSentFromUser: false,
          },
        ],
      }));
      setIsContactTyping(contactId, false);
    }
  };

  return (
    <CurrentChatContext.Provider
      value={{ ...currentChat, loadCurrentChat, addNewMessage }}
    >
      {children}
    </CurrentChatContext.Provider>
  );
}
