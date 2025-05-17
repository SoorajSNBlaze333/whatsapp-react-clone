import { useTab } from "@/app/hooks/use-tab";
import Chats from "./chats";

export default function TabPanelSwitcher() {
  const { selectedTab } = useTab();

  if (selectedTab === "chats") {
    return <Chats selectedTab={selectedTab} />;
  }

  return <div className="text-white">Coming soon...</div>;
}
