import dayjs from "dayjs";

export const formatTime = (timestamp: number) => {
  const now = dayjs(timestamp);
  return now.format("h:mm A");
};

export const getTimestamp = () => {
  const date = new Date();
  const now = dayjs(date).unix();
  return now;
};
