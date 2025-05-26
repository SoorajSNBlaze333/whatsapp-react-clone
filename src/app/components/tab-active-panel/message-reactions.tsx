import { ReactionType } from "@/app/context/chats-provider";

export default function MessageReactions({
  reactions,
  isSentFromUser,
}: {
  reactions: ReactionType[];
  isSentFromUser: boolean;
}) {
  return (
    <div
      className={`absolute z-20 -bottom-4 ${
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
}
