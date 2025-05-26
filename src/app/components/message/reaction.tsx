import { PlusCircleIcon, SmileyIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const item = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1 },
};

const reactions = ["👍🏼", "❤️", "😂", "😮", "🥲", "🙏🏻"];

export default function Reaction({
  isSentFromUser,
}: {
  isSentFromUser: boolean;
}) {
  const [showReactionEmoji, setShowReactionEmoji] = useState(false);
  const [reactionMenuOpen, setReactionMenuOpen] = useState(false);

  const handleMouseLeave = () => {
    setShowReactionEmoji(false || reactionMenuOpen);
  };

  const handleMouseOver = () => {
    setShowReactionEmoji(true);
  };

  const handleEmojiClick = () => {
    setReactionMenuOpen((prev) => !prev);
  };

  const renderReactionMenu = () => {
    return (
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { scale: 0.8 },
            show: {
              scale: 1,
              transition: { type: "spring", bounce: 0.5, duration: 0.5 },
            },
          }}
          className="bg-black overflow-hidden rounded-full absolute z-50 -top-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  type: "spring",
                  staggerChildren: 0.05,
                  staggerDirection: isSentFromUser ? -1 : 1,
                  bounce: 0.5,
                  duration: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="bg-white/15 text-white flex w-auto justify-between items-center gap-2 p-2 px-4"
          >
            {reactions.map((reaction: string, index) => (
              <motion.p
                variants={item}
                className="text-3xl cursor-pointer"
                key={index}
              >
                {reaction}
              </motion.p>
            ))}
            <PlusCircleIcon
              weight="duotone"
              className="size-8 cursor-pointer"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div
      className={`relative flex flex-col justify-center items-center ${
        showReactionEmoji ? "opacity-100" : "opacity-0"
      }`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {reactionMenuOpen && renderReactionMenu()}
      <SmileyIcon
        weight="regular"
        className="size-5 text-white/40 cursor-pointer"
        onClick={handleEmojiClick}
      />
    </div>
  );
}
