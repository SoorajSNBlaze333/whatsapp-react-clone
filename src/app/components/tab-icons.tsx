import Profile from "./profile";
import TooltipWrapper from "./tooltip-wrapper";
import { useTab } from "../hooks/use-tab";
import TabIcon from "./tab-icon";
import { useProfile } from "../hooks/use-profile";
import { GithubLogoIcon } from "@phosphor-icons/react";

export default function TabIcons() {
  const {
    profile: { avatarUrl },
  } = useProfile();
  const { selectedTab, selectTab, topTabs } = useTab();

  return (
    <section className="flex flex-col justify-between items-center w-full h-full bg-black/85 border-r-[1px] border-gray-300/20">
      <section className="flex flex-col justify-between items-center gap-2 py-4">
        {topTabs.map((tab: string, index: number) => (
          <TooltipWrapper
            key={index}
            selected={selectedTab === tab}
            onClick={() => selectTab(tab)}
            tab={tab}
          >
            <TabIcon tab={tab} />
          </TooltipWrapper>
        ))}
        <hr className="px-4 w-full border-[1px] border-gray-500/65" />
        <TooltipWrapper
          selected={selectedTab === "ai"}
          onClick={() => selectTab("ai")}
          tab="ai"
        >
          <div
            className={`size-6 ${
              selectedTab === "ai" ? "border-blue-500" : "border-blue-500/80"
            } border-4 bg-transparent rounded-full`}
          ></div>
        </TooltipWrapper>
      </section>
      <section className="flex flex-col justify-between items-center gap-2 py-4">
        <hr className="px-4 w-full border-[1px] border-gray-500/65" />
        <TooltipWrapper tab="Github">
          <a
            href="https://github.com/SoorajSNBlaze333/whatsapp-react-clone"
            target="_blank"
            className="bg-gray-200 p-1 rounded-full"
          >
            <GithubLogoIcon className="size-5" weight="fill" />
          </a>
        </TooltipWrapper>
        <TooltipWrapper
          selected={selectedTab === "settings"}
          onClick={() => selectTab("settings")}
          tab="settings"
        >
          <TabIcon tab="settings" />
        </TooltipWrapper>
        <TooltipWrapper tab="profile" onClick={() => selectTab("profile")}>
          <Profile url={avatarUrl} />
        </TooltipWrapper>
      </section>
    </section>
  );
}
