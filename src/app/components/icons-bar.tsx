import {
  ChatCircleTextIcon,
  ChatTextIcon,
  CircleDashedIcon,
  GearSixIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import Profile from "./profile";

export default function IconsBar() {
  return (
    <section className="flex flex-col justify-between items-center w-full h-full bg-black/85 border-r-[1px] border-gray-300/20">
      <section className="flex flex-col justify-between items-center gap-5 py-5">
        <ChatTextIcon
          className="size-6 text-white cursor-pointer"
          weight="fill"
        />
        <CircleDashedIcon
          className="size-6 text-white cursor-pointer"
          weight="bold"
        />
        <ChatCircleTextIcon
          className="size-6 text-white cursor-pointer"
          weight="bold"
        />
        <UsersThreeIcon
          className="size-6 text-white cursor-pointer"
          weight="bold"
        />
        <hr className="mx-4 w-full border-[1px] border-gray-500/65" />
        <div className="size-6 border-4 border-blue-500 bg-transparent rounded-full"></div>
      </section>
      <section className="flex flex-col justify-between items-center gap-5 py-5">
        <hr className="mx-4 w-full border-[1px] border-gray-500/65" />
        <GearSixIcon
          className="size-6 text-white cursor-pointer"
          weight="bold"
        />
        <Profile />
      </section>
    </section>
  );
}
