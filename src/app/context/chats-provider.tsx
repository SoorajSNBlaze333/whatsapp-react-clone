import { createContext, PropsWithChildren, useEffect, useState } from "react";

export enum Filters {
  ALL = "all",
  UNREAD = "unread",
  FAVORITES = "favorites",
  GROUPS = "groups",
}

export type ReactionType = {
  emoji: string;
  count: number;
};

export type Message = {
  contactId: string;
  message: string;
  timestamp: number;
  isSentFromUser: boolean;
  read?: boolean;
  sent?: boolean;
  delivered?: boolean;
  reactions?: ReactionType[];
};

export type Chat = {
  id: string;
  contactId: string | string[];
  groupName?: string;
  groupAvatar?: string;
  read: boolean;
  group: boolean;
  favorite: boolean;
  messages: Message[];
};

export type Chats = {
  complete: Chat[];
  filtered: Chat[];
  isLoading: boolean;
};

export const ChatsContext = createContext<
  | undefined
  | {
      filter: string;
      updateFilter: (filter: string) => void;
      search: string;
      updateSearch: (query: string) => void;
      chats: Chats;
    }
>(undefined);

export default function ChatsProvider({ children }: PropsWithChildren) {
  const [filter, setFilter] = useState<Filters>(Filters.ALL);
  const [search, setSearch] = useState<string>("");
  const [chats, setChats] = useState<Chats>({
    complete: [],
    filtered: [],
    isLoading: false,
  });

  const updateFilter = (filter: string) => {
    setFilter(filter as Filters);
  };

  const updateSearch = (query: string) => {
    setSearch(query);
  };

  useEffect(() => {
    const fetchChats = async () => {
      setChats((prev) => ({ ...prev, isLoading: true }));
      const response = await fetch("/api/mock/chats");
      const data = await response.json();
      setChats((prev) => ({
        ...prev,
        complete: data,
        filtered: data,
        isLoading: false,
      }));
    };

    fetchChats();
  }, []);

  useEffect(() => {
    setChats((prev) => {
      const complete = prev.complete;
      const filtered = complete.filter((chat) => {
        if (filter === Filters.UNREAD && chat.read === false) {
          return chat;
        } else if (filter === Filters.FAVORITES && chat.favorite === true) {
          return chat;
        } else if (filter === Filters.GROUPS && chat.group === true) {
          return chat;
        } else if (filter === Filters.ALL) {
          return chat;
        }
      });

      return {
        ...prev,
        filtered,
      };
    });
  }, [filter]);

  return (
    <ChatsContext.Provider
      value={{ chats, filter, search, updateFilter, updateSearch }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
