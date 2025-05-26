import { Message } from "@/app/context/chats-provider";
import MessageStatusIcon from "../message-status-icon";
import { useCurrentChat } from "@/app/hooks/use-current-chat";
import Profile from "../profile";
import { useContacts } from "@/app/hooks/use-contacts";
import { formatTime } from "@/app/utils";

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

export default function ChatMessage({ message }: { message: Message }) {
  const { getContact } = useContacts();
  const { group } = useCurrentChat();

  if (group) {
    return (
      <div className="flex justify-between items-start gap-2 w-max ">
        {!message.isSentFromUser && (
          <Profile url={getContact(message.contactId)?.contactAvatar} />
        )}
        <div className="rounded-lg overflow-hidden bg-black z-20">
          <div
            className={`flex flex-col justify-center items-start px-2 p-1.5 gap-1 ${
              message.isSentFromUser ? "bg-emerald-900" : "bg-white/20"
            }`}
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
      </div>
    );
  }
  return (
    <div className="rounded-lg bg-black z-10 overflow-hidden w-max">
      <div
        className={`flex justify-between items-end px-2 p-1.5 gap-2 ${
          message.isSentFromUser ? "bg-emerald-900" : "bg-white/20"
        }`}
      >
        <p className="text-white text-sm">{message.message}</p>
        <p className="text-white/80 text-xs">{formatTime(message.timestamp)}</p>
        {message.isSentFromUser && (
          <MessageStatusIcon message={message} isInMessage />
        )}
      </div>
    </div>
  );
}
