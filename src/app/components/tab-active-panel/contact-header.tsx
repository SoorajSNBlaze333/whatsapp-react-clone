import { Contact } from "@/app/context/contacts-provider";
import { useCurrentChat } from "@/app/hooks/use-current-chat";
import { useProfile } from "@/app/hooks/use-profile";
import Profile from "../profile";
import {
  CaretDownIcon,
  DotsThreeVerticalIcon,
  MagnifyingGlassIcon,
  UsersThreeIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react";
import TooltipWrapper from "../tooltip-wrapper";

export default function ContactHeader() {
  const {
    profile: { id },
  } = useProfile();
  const { contact, group } = useCurrentChat();

  const renderContactStatus = () => {
    return (
      <p className="text-xs text-white/50">
        {contact?.typing ? "typing" : "online"}
      </p>
    );
  };

  const renderChatOptions = () => {
    return (
      <section className="flex justify-end items-center gap-2">
        <TooltipWrapper showTooltip={false}>
          <div className="flex justify-between items-center gap-1">
            <VideoCameraIcon className="text-white size-5" weight="bold" />
            <CaretDownIcon className="text-white size-5" weight="bold" />
          </div>
        </TooltipWrapper>
        <TooltipWrapper showTooltip={false}>
          <MagnifyingGlassIcon className="text-white size-5" weight="bold" />
        </TooltipWrapper>
        <TooltipWrapper showTooltip={false}>
          <DotsThreeVerticalIcon className="text-white size-5" weight="bold" />
        </TooltipWrapper>
      </section>
    );
  };

  if (group) {
    const renderGroupContactNames = (): string => {
      return Object.values(group.contacts)
        .map((groupContact?: Contact) =>
          groupContact?.id === id ? "You" : groupContact?.displayName
        )
        .join(", ");
    };

    return (
      <div className="h-auto w-full flex gap-4 justify-between items-center p-3 px-4">
        <div className="flex gap-4 justify-start items-center">
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
        <div>{renderChatOptions()}</div>
      </div>
    );
  }
  return (
    <div className="w-full h-fit bg-black z-50">
      <div className="flex gap-4 h-full w-full bg-white/10 justify-between items-center p-3 px-4">
        <div className="flex gap-4 justify-start items-center">
          <Profile size="10" url={contact?.contactAvatar} />
          <div className="flex flex-col">
            <p className="text-white">{contact?.displayName}</p>
            {renderContactStatus()}
          </div>
        </div>
        <div>{renderChatOptions()}</div>
      </div>
    </div>
  );
}
