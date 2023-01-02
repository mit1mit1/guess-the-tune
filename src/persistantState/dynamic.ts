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
