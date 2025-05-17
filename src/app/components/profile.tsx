export default function Profile({ size }: { size?: string }) {
  const sizeClass =
    {
      6: "w-6 h-6",
      7: "w-7 h-7",
      8: "w-8 h-8",
      10: "w-10 h-10",
      11: "w-11 h-11",
      12: "w-12 h-12",
    }[size ?? 7] ?? "w-7 h-7";

  return (
    <section
      className={`${sizeClass} overflow-hidden relative flex justify-center items-center rounded-full cursor-pointer`}
    >
      <div className="w-full h-full bg-red-400"></div>
    </section>
  );
}
