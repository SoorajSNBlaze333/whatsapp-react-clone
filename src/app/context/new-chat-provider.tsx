import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useTab } from "../hooks/use-tab";

export const NewChatContext = createContext<
  | undefined
  | {
      isNewChatWindowOpen: boolean;
      openNewChatWindow: () => void;
      closeNewChatWindow: () => void;
    }
>(undefined);

export default function NewChatProvider({ children }: PropsWithChildren) {
  const { selectedTab } = useTab();
  const [isNewChatWindowOpen, setNewChatWindowOpen] = useState<boolean>(false);

  const openNewChatWindow = () => {
    setNewChatWindowOpen(true);
  };

  const closeNewChatWindow = () => {
    setNewChatWindowOpen(false);
  };

  useEffect(() => {
    closeNewChatWindow();
  }, [selectedTab]);

  return (
    <NewChatContext.Provider
      value={{ isNewChatWindowOpen, openNewChatWindow, closeNewChatWindow }}
    >
      {children}
    </NewChatContext.Provider>
  );
}
