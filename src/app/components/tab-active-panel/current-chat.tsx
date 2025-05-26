import { Message, ReactionType } from "@/app/context/chats-provider";
import { useCurrentChat } from "@/app/hooks/use-current-chat";
import Profile from "../profile";
import { formatTime } from "@/app/utils";
import MessageStatusIcon from "../message-status-icon";
import { Contact } from "@/app/context/contacts-provider";
import { useProfile } from "@/app/hooks/use-profile";
import { UsersThreeIcon } from "@phosphor-icons/react";
import Reaction from "../message/reaction";
import { useContacts } from "@/app/hooks/use-contacts";

export default function CurrentChat() {
  const {
    profile: { id },
  } = useProfile();
  const { chatId, messages, contact, group } = useCurrentChat();
  const { getContact } = useContacts();

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

  const getMessageSpacing = (userId: string, index: number): string => {
    // TODO: Fix this
    if (index === messages.length - 1) {
      return "mt-4";
    }
    if (messages[index + 1] && messages[index + 1].contactId === userId) {
      return "mt-0.5";
    }
    return "mt-4";
    // } else {
    //   if (messages[index + 1] && messages[index + 1].contactId !== userId) {
    //     return "mb-0.5";
    //   }
    //   return "mb-4";
    // return "mb-4";
  };

  const renderContactStatus = () => {
    return (
      <p className="text-xs text-white/50">
        {contact?.typing ? "typing" : "online"}
      </p>
    );
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
          <Profile size="10">
            <div className="h-full w-full flex justify-center items-center bg-white/50">
              <UsersThreeIcon className="size-6 text-white" weight="fill" />
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
      <div className="w-full h-fit bg-black z-50">
        <div className="flex gap-4 h-full w-full bg-white/10 justify-start items-center p-3 px-4">
          <Profile size="10" url={contact?.contactAvatar} />
          <div className="flex flex-col">
            <p className="text-white">{contact?.displayName}</p>
            {renderContactStatus()}
          </div>
        </div>
      </div>
    );
  };

  const renderMessageReactions = (
    reactions: ReactionType[],
    isSentFromUser: boolean
  ) => {
    return (
      <div
        className={`absolute -bottom-4 ${
          isSentFromUser ? "right-3" : "left-3"
        }`}
      >
        {reactions.map((reaction: ReactionType, index: number) => (
          <div
            key={index}
            className="flex justify-center items-center rounded-xl overflow-hidden bg-black"
          >
            <p className="text-xs rounded-xl border-[1px] border-white/25 bg-white/20 px-1 py-0.5">
              {reaction.emoji}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderChatMessage = (message: Message) => {
    if (group) {
      return (
        <div className="flex justify-between items-start gap-2 w-max ">
          {!message.isSentFromUser && (
            <Profile url={getContact(message.contactId)?.contactAvatar} />
          )}
          <div className="rounded-lg overflow-hidden bg-black">
            <div
              className={`flex flex-col justify-center items-start px-2 p-1.5 gap-1 ${
                message.isSentFromUser ? "bg-emerald-900" : "bg-white/20"
              }`}
            >
              {!message.isSentFromUser && (
                <p
                  className={`text-xs font-semibold ${getRandomContactColor()}`}
                >
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
        </div>
      );
    }
    return (
      <div
        className={`rounded-lg flex justify-between items-end px-2 p-1.5 ${
          message.isSentFromUser ? "bg-emerald-900" : "bg-white/10"
        } w-max gap-2`}
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
      <div className="h-[100%] w-full flex flex-col justify-end items-center relative">
        <div className="absolute background-custom h-full w-full"></div>
        <section className="p-4 w-full h-full flex flex-col justify-end items-center relative">
          {messages.map((message: Message, index: number) => (
            <div
              className={`w-full flex items-center ${
                message.isSentFromUser ? "justify-end" : "justify-start"
              }`}
              key={index}
            >
              <div
                className={`flex justify-between gap-2 items-center ${getMessageSpacing(
                  message.contactId,
                  index
                )} relative`}
              >
                {message.isSentFromUser && <Reaction isSentFromUser={true} />}
                {renderChatMessage(message)}
                {!message.isSentFromUser && <Reaction isSentFromUser={false} />}
                {message.reactions?.length &&
                  renderMessageReactions(
                    message.reactions,
                    message.isSentFromUser
                  )}
              </div>
            </div>
          ))}
        </section>
        <section className="w-full z-50 h-auto p-4">
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
