import dayjs from "dayjs";

export const formatTime = (timestamp: number) => {
  const now = dayjs(timestamp);
  return now.format("h:mm A");
};
