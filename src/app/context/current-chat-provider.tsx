import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Chat, Message } from "./chats-provider";
import { useChats } from "../hooks/use-chats";
import { useContacts } from "../hooks/use-contacts";
import { Contact } from "./contacts-provider";

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
  const { contacts } = useContacts();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     setProfile((prev) => ({ ...prev, isLoading: true }));
  //     const response = await fetch("/api/mock/profile");
  //     const data = await response.json();
  //     setProfile((prev) => ({
  //       ...prev,
  //       profile: data,
  //       isLoading: false,
  //     }));
  //   };

  //   fetchProfile();
  // }, []);

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

  return (
    <CurrentChatContext.Provider value={{ ...currentChat, loadCurrentChat }}>
      {children}
    </CurrentChatContext.Provider>
  );
}
