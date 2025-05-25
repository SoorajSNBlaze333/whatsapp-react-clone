import { Message } from "@/app/context/chats-provider";
import { useCurrentChat } from "@/app/hooks/use-current-chat";
import Profile from "../profile";
import { formatTime } from "@/app/utils";
import MessageStatusIcon from "../message-status-icon";
import { Contact } from "@/app/context/contacts-provider";
import { useProfile } from "@/app/hooks/use-profile";
import { UsersThreeIcon } from "@phosphor-icons/react";

export default function CurrentChat() {
  const {
    profile: { id },
  } = useProfile();
  const { chatId, messages, contact, group } = useCurrentChat();

  if (!chatId) {
    return (
      <section className="w-full h-full text-white flex justify-center items-center">
        Please select a chat to see messages
      </section>
    );
  }

  const getRandomContactColor = (): string => {
    const colors = [
      "text-pink-400",
      "text-sky-300",
      "text-teal-300",
      "text-amber-300",
      "text-green-300",
    ];
    const max = Math.floor(colors.length - 1);
    const min = Math.ceil(0);
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return colors[random];
  };

  const getMessageSpacing = (): // isUserMessage: boolean,
  // userId: string,
  // index: number
  string => {
    // TODO: Fix this
    // if (index === messages.length - 1) {
    //   return "mb-4";
    // }
    // if (isUserMessage) {
    //   if (messages[index + 1] && messages[index + 1].contactId === userId) {
    //     return "mb-0.5";
    //   }
    //   return "mb-4";
    // } else {
    //   if (messages[index + 1] && messages[index + 1].contactId !== userId) {
    //     return "mb-0.5";
    //   }
    //   return "mb-4";
    // }
    return "mb-4";
  };

  const renderOnline = () => {
    return <p className="text-sm text-white/50">online</p>;
  };

  const renderContact = () => {
    if (group) {
      const renderGroupContactNames = (): string => {
        return Object.values(group.contacts)
          .map((groupContact?: Contact) =>
            groupContact?.id === id ? "You" : groupContact?.displayName
          )
          .join(", ");
      };

      return (
        <div className="h-auto w-full flex gap-4 justify-start items-center p-3 px-4">
          <Profile size="12">
            <div className="h-full w-full flex justify-center items-center bg-white/50">
              <UsersThreeIcon className="size-7 text-white" weight="fill" />
            </div>
          </Profile>
          <div className="flex flex-col">
            <p className="text-white">{group.name}</p>
            <p className="text-white/50 text-xs">{renderGroupContactNames()}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="h-auto w-full flex gap-4 justify-start items-center p-3 px-4">
        <Profile size="10" />
        <div className="flex flex-col">
          <p className="text-white">{contact?.displayName}</p>
          {renderOnline()}
        </div>
      </div>
    );
  };

  const renderChatMessage = (message: Message) => {
    console.log(group);
    if (group) {
      return (
        <div className="flex justify-between items-start gap-2">
          {!message.isSentFromUser && <Profile />}
          <div
            className={`rounded-lg flex flex-col justify-center items-start px-2 p-1.5 ${
              message.isSentFromUser ? "bg-emerald-900" : "bg-white/10"
            } w-max gap-1 ${getMessageSpacing()}`}
          >
            {!message.isSentFromUser && (
              <p className={`text-xs font-semibold ${getRandomContactColor()}`}>
                {group.contacts[message.contactId]?.displayName}
              </p>
            )}
            <div className="flex justify-between items-end gap-2">
              <p className="text-white text-sm">{message.message}</p>
              <p className="text-white/80 text-xs">
                {formatTime(message.timestamp)}
              </p>
              {message.isSentFromUser && (
                <MessageStatusIcon message={message} isInMessage />
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className={`rounded-lg flex justify-between items-end px-2 p-1.5 ${
          message.isSentFromUser ? "bg-emerald-900" : "bg-white/10"
        } w-max gap-2 ${getMessageSpacing()}`}
      >
        <p className="text-white text-sm">{message.message}</p>
        <p className="text-white/80 text-xs">{formatTime(message.timestamp)}</p>
        {message.isSentFromUser && (
          <MessageStatusIcon message={message} isInMessage />
        )}
      </div>
    );
  };

  return (
    <section className="w-full h-full flex flex-col">
      {renderContact()}
      <div className="h-full w-full flex flex-col justify-end items-center p-4">
        {messages.map((message: Message, index: number) => (
          <div
            className={`w-full flex items-center ${
              message.isSentFromUser ? "justify-end" : "justify-start"
            }`}
            key={index}
          >
            {renderChatMessage(message)}
          </div>
        ))}
        <section className="w-full h-auto">
          <div className="bg-black rounded-full overflow-hidden">
            <div className="bg-white/15 rounded-full">
              <input
                className="w-full outline-none p-3 px-4 text-white placeholder-white/60 caret-green-400 text-sm rounded-full"
                placeholder="Type a message"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
