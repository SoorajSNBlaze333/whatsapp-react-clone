import {
  ChatCircleTextIcon,
  ChatTextIcon,
  CircleDashedIcon,
  GearSixIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { useTab } from "../hooks/use-tab";

export default function TabIcon({ tab }: { tab?: string }) {
  const { selectedTab } = useTab();

  let Component = GearSixIcon;
  if (tab === "chats") {
    Component = ChatTextIcon;
  } else if (tab === "status") {
    Component = CircleDashedIcon;
  } else if (tab === "channels") {
    Component = ChatCircleTextIcon;
  } else if (tab === "communities") {
    Component = UsersThreeIcon;
  } else if (tab === "settings") {
    Component = GearSixIcon;
  }

  return (
    <Component
      className={`size-6 ${
        selectedTab === tab ? "text-white" : "text-gray-400"
      }`}
      weight={selectedTab === tab && tab !== "status" ? "fill" : "bold"}
    />
  );
}
