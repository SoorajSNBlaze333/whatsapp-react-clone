"use client";

import IconsBar from "./components/icons-bar";

export default function Home() {
  return (
    <section className="h-full w-full grid grid-cols-24">
      <IconsBar />
      <section className="col-span-7 h-full w-full bg-black/90 border-r-[1px] border-gray-300/20"></section>
      <section className="col-span-16 h-full w-full bg-black/90"></section>
    </section>
  );
}
