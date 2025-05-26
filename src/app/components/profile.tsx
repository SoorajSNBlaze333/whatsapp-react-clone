import Image from "next/image";
import { PropsWithChildren } from "react";

export default function Profile({
  children,
  size,
  url,
}: PropsWithChildren<{ size?: string; url?: string }>) {
  const sizeClass =
    {
      6: "w-6 h-6",
      7: "w-7 h-7",
      8: "w-8 h-8",
      10: "w-10 h-10",
      11: "w-11 h-11",
      12: "w-12 h-12",
    }[size ?? 7] ?? "w-7 h-7";

  const renderAvatar = () => {
    if (url && url.length > 0) {
      return (
        <div
          className={`${sizeClass} bg-amber-300 flex justify-center items-center`}
        >
          <Image
            src={url}
            className={sizeClass}
            height={20}
            width={20}
            alt="profile"
          />
        </div>
      );
    }
    return <div className="w-full h-full bg-amber-300"></div>;
  };

  return (
    <section
      className={`${sizeClass} overflow-hidden relative flex justify-center items-center rounded-full cursor-pointer`}
    >
      {children ?? renderAvatar()}
    </section>
  );
}
