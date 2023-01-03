import dayjs from "dayjs";
import { isLatestTune } from "src/constants/songHistory";

export const getLastCorrectIndex = () =>
  localStorage.getItem("lastCorrectIndex");

export const setTodaysTurns = (guesses: number) => {
  if (isLatestTune && !localStorage.getItem("lastTurns")) {
    localStorage.setItem("lastTurns", guesses.toString());
  }
};

export const getTodaysTurns = () => {
  const storageLastTime = localStorage.getItem("lastTurns");
  return isLatestTune && storageLastTime;
};

export const getAllGuessed = () => {
  const allGuessedStorage = JSON.parse(
    localStorage.getItem("allGuessed") || "[]"
  );
  if (!Array.isArray(allGuessedStorage)) {
    return [];
  }
  return allGuessedStorage;
};

export const setSongIndexGuessed = (songIndex: string) => {
  if (isLatestTune) {
    localStorage.setItem("lastCorrectIndex", songIndex);
  }
  const allGuessed = getAllGuessed();
  allGuessed.push(songIndex);
  localStorage.setItem("allGuessed", JSON.stringify(allGuessed));
};

const loadTime = dayjs();
const getSecondsSinceLoaded = () =>
  dayjs().diff(loadTime, "s", true).toFixed(2);

export const setTodaysTime = () => {
  if (isLatestTune && !localStorage.getItem("lastTime")) {
    localStorage.setItem("lastTime", getSecondsSinceLoaded());
  }
};

export const getTimePlayed = () => {
  const storageLastTime = localStorage.getItem("lastTime");
  if (storageLastTime && isLatestTune) {
    return storageLastTime;
  }
  return getSecondsSinceLoaded();
};
