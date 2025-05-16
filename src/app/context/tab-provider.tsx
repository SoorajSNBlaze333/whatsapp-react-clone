import { createContext, PropsWithChildren, useState } from "react";

const TOP_TABS = ["chats", "status", "channels", "communities"];

export const TabContext = createContext<
  | undefined
  | { selectedTab: string; selectTab: (tab: string) => void; topTabs: string[] }
>(undefined);

export default function TabProvider({ children }: PropsWithChildren) {
  const [selectedTab, setSelectedTab] = useState<string>("chats");

  const selectTab = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <TabContext.Provider value={{ selectedTab, selectTab, topTabs: TOP_TABS }}>
      {children}
    </TabContext.Provider>
  );
}
