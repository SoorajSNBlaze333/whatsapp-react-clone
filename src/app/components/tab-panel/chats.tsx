import {
  ChatDotsIcon,
  CheckIcon,
  ChecksIcon,
  DotsThreeVerticalIcon,
  UsersThreeIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import TooltipWrapper from "../tooltip-wrapper";
import { useNewChat } from "@/app/hooks/use-new-chat";
import { useChats } from "@/app/hooks/use-chats";
import { Chat, Filters, Message } from "@/app/context/chats-provider";
import Profile from "../profile";
import dayjs from "dayjs";
import { useProfile } from "@/app/hooks/use-profile";
import { useContacts } from "@/app/hooks/use-contacts";

export default function Chats({ selectedTab }: { selectedTab: string }) {
  const {
    profile: { blueTickEnabled },
  } = useProfile();
  const { openNewChatWindow } = useNewChat();
  const {
    filter,
    updateFilter,
    chats: { filtered, isLoading },
  } = useChats();
  const { getContact } = useContacts();

  const formatTime = (timestamp: number) => {
    const now = dayjs(timestamp);
    return now.format("h:mm A");
  };

  const renderMessageStatus = (message: Message) => {
    if (!message.isSentFromUser) {
      return null;
    } else {
      if (message.read) {
        if (blueTickEnabled) {
          return <ChecksIcon className="size-5 text-blue-400" />;
        }
        return <ChecksIcon className="size-5 text-white/40" />;
      } else if (message.delivered) {
        return <ChecksIcon className="size-5 text-white/40" />;
      } else if (message.sent) {
        return <CheckIcon className="size-4 text-white/40" />;
      }
      return <WarningCircleIcon className="size-5 text-white/40" />;
    }
  };

  const renderChat = (chat: Chat) => {
    const name =
      typeof chat.contactId === "string"
        ? getContact(chat.contactId)?.displayName
        : chat.groupName;
    const lastMessage = chat.messages[chat.messages.length - 1];

    return (
      <div className="grid grid-cols-6 w-full gap-4 p-2.5 hover:bg-white/10 rounded-xl cursor-pointer">
        <div className="col-span-1">
          {!chat.group ? (
            <Profile size="12" />
          ) : (
            <Profile size="12">
              <div className="h-full w-full flex justify-center items-center bg-white/50">
                <UsersThreeIcon className="size-7 text-white" weight="fill" />
              </div>
            </Profile>
          )}
        </div>
        <div className="col-span-3 flex flex-col justify-center items-start w-full">
          <p className="text-white">{name}</p>
          <div className="flex justify-start items-center gap-1 w-full">
            {renderMessageStatus(lastMessage)}
            <p
              className={`text-sm ${
                chat.read || lastMessage.isSentFromUser
                  ? "text-white/55"
                  : "text-white font-semibold"
              } whitespace-nowrap truncate text-ellipsis overflow-hidden`}
            >
              {chat.group
                ? `${getContact(lastMessage.contactId)?.displayName}: ${
                    lastMessage.message
                  }`
                : lastMessage.message}
            </p>
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-center items-end">
          <p
            className={`text-xs font-semibold ${
              chat.read || lastMessage.isSentFromUser
                ? "text-white/55"
                : "text-emerald-400"
            }`}
          >
            {formatTime(lastMessage.timestamp)}
          </p>
        </div>
      </div>
    );
  };

  const renderChats = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex justify-center items-center text-white/50">
          Loading...
        </div>
      );
    }

    return filtered.map(renderChat);
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
      <section className="w-full flex flex-col gap-1">{renderChats()}</section>
    </section>
  );
}
