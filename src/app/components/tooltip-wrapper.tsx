"use client";

import { PropsWithChildren, useRef, useState } from "react";

type TooltipWrapperProps = {
  selected?: boolean;
  onClick?: () => void;
  isProfile?: boolean;
  tab?: string;
  showTooltip?: boolean;
};

export default function TooltipWrapper({
  selected = false,
  isProfile = false,
  tab,
  onClick,
  children,
  showTooltip = true,
}: PropsWithChildren<TooltipWrapperProps>) {
  const position = "right";
  const offset = 4;
  const wrapperRef = useRef<HTMLButtonElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const tooltipPositionStyles = () => {
    if (position === "right") {
      return {
        left: wrapperRef.current
          ? wrapperRef.current.getBoundingClientRect().right
          : 0,
      };
    }
    return {};
  };

  const getOffset = () => {
    if (position === "right") {
      return `ml-${offset}`;
    }
    return "";
  };

  return (
    <button
      className={`${
        isProfile ? "p-1" : "p-2"
      } flex justify-center items-center ${
        selected ? "bg-gray-700/90" : "bg-transparent"
      } hover:bg-gray-700/90 rounded-full outline-none cursor-pointer relative`}
      onClick={onClick}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={wrapperRef}
    >
      {children}
      {showTooltip && isHovering && (
        <div
          className={`absolute ${getOffset()} bg-white text-xs font-semibold py-1 px-2 rounded-full capitalize z-50`}
          style={tooltipPositionStyles()}
        >
          {tab}
        </div>
      )}
    </button>
  );
}
