import { ChatDotsIcon, DotsThreeVerticalIcon } from "@phosphor-icons/react";
import TooltipWrapper from "../tooltip-wrapper";
import { useNewChat } from "@/app/hooks/use-new-chat";

export default function Chats({ selectedTab }: { selectedTab: string }) {
  const { openNewChatWindow } = useNewChat();

  return (
    <section className="w-full flex justify-between items-center p-4 relative">
      <p className="text-white text-2xl font-semibold capitalize">
        {selectedTab}
      </p>
      <section className="flex justify-between items-center gap-2">
        <TooltipWrapper showTooltip={false} onClick={openNewChatWindow}>
          <ChatDotsIcon className="text-white size-6" weight="bold" />
        </TooltipWrapper>
        <TooltipWrapper showTooltip={false}>
          <DotsThreeVerticalIcon className="text-white size-6" weight="bold" />
        </TooltipWrapper>
      </section>
    </section>
  );
}
