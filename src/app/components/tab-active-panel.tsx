import { GearSixIcon } from "@phosphor-icons/react";
import { useTab } from "../hooks/use-tab";

export default function TabActivePanel() {
  const { selectedTab } = useTab();
  return (
    <section className="col-span-16 h-full w-full bg-black/90 flex flex-col justify-center items-center gap-4">
      <GearSixIcon className="size-10 text-gray-400" />
      <p className="text-white text-3xl capitalize">{selectedTab}</p>
    </section>
  );
}
