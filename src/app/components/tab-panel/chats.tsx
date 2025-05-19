import {
  ChatDotsIcon,
  ChecksIcon,
  DotsThreeVerticalIcon,
} from "@phosphor-icons/react";
import TooltipWrapper from "../tooltip-wrapper";
import { useNewChat } from "@/app/hooks/use-new-chat";
import { useChats } from "@/app/hooks/use-chats";
import { Chat, Filters } from "@/app/context/chats-provider";
import Profile from "../profile";
import dayjs from "dayjs";

export default function Chats({ selectedTab }: { selectedTab: string }) {
  const { openNewChatWindow } = useNewChat();
  const { filter, updateFilter, chats } = useChats();

  const formatTime = (timestamp: number) => {
    const now = dayjs(timestamp);
    return now.format("h:mm A");
  };

  return (
    <section className="w-full flex flex-col gap-3 p-4 relative">
      <section className="w-full flex justify-between items-center">
        <p className="text-white text-2xl font-semibold capitalize">
          {selectedTab}
        </p>
        <section className="flex justify-between items-center gap-2">
          <TooltipWrapper showTooltip={false} onClick={openNewChatWindow}>
            <ChatDotsIcon className="text-white size-6" weight="bold" />
          </TooltipWrapper>
          <TooltipWrapper showTooltip={false}>
            <DotsThreeVerticalIcon
              className="text-white size-6"
              weight="bold"
            />
          </TooltipWrapper>
        </section>
      </section>
      <section className="w-full flex flex-col gap-1">
        <input
          className="rounded-full w-full p-2 px-4 outline-none bg-white/10 hover:ring-[1px] hover:ring-gray-600 focus:ring-2 focus:ring-green-500 ring-0 ring-transparent focus:bg-transparent placeholder-gray-400 focus:placeholder-gray-400 text-white"
          placeholder="Search or start a new chat"
        />
        <div className="flex justify-start items-center text-white gap-2 mt-2">
          {Object.values(Filters).map((f: string) => (
            <button
              key={f}
              className={`${
                f === filter
                  ? "bg-green-700/30 text-green-100 border-green-600/30"
                  : "border-white/20 hover:bg-white/10"
              } text-sm p-1 px-3 border-[1px] rounded-full cursor-pointer capitalize`}
              onClick={() => updateFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>
      <section className="w-full flex flex-col gap-1">
        {chats.filtered.map((chat: Chat) => (
          <div
            key={chat.id}
            className="grid grid-cols-6 w-full gap-4 p-2.5 hover:bg-white/10 rounded-xl cursor-pointer"
          >
            <div className="col-span-1">
              <Profile size="12" />
            </div>
            <div className="col-span-3 flex flex-col justify-center items-start w-full">
              <p className="text-white">{chat.contact.name} (You)</p>
              <div className="flex justify-start items-center gap-1 w-full">
                <ChecksIcon
                  className={`size-5 ${
                    chat.lastMessage.blueTickEnabled && chat.lastMessage.read
                      ? "text-blue-400"
                      : "text-white/30"
                  }`}
                />
                <p className="text-sm text-white/55 whitespace-nowrap truncate text-ellipsis overflow-hidden">
                  {chat.lastMessage.message}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-end">
              <p className="text-xs font-semibold text-white/55">
                {formatTime(chat.lastMessage.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
