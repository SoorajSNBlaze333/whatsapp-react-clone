import { useContext } from "react";
import { TabContext } from "../context/tab-provider";

export const useTab = () => {
  const ctx = useContext(TabContext);

  if (!ctx) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return ctx;
};
