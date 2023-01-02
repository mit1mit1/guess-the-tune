import { Note } from "src/types";
import { gameSongs } from "src/gameSongs";
import {
  chosenSongIndex,
  isLatestTune,
  availableIndices,
  availableSongs,
} from "src/constants/game";
import dayjs from "dayjs";

const containsItem = (arr: Array<any>, item: any) => {
  let found = false;
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(item) === JSON.stringify(arr[i])) {
      found = true;
      break;
    }
  }
  return found;
};

export const pushIfNotIdentical = (
  oldArrayOfArrays: Array<Array<any>>,
  index: number,
  newItem: any
) => {
  const newArray = [...oldArrayOfArrays];
  if (!containsItem(oldArrayOfArrays[index], newItem)) {
    newArray[index].push(newItem);
  }
  return newArray;
};

export const isGuessable = (note: Note) => {
  return !note.rest;
};

export const setTodaysGuessed = () => {
  if (isLatestTune) {
    localStorage.setItem("lastCorrectIndex", chosenSongIndex.toString());
  }
  const allGuessed = getAllGuessed();
  allGuessed.push(chosenSongIndex);
  localStorage.setItem("allGuessed", JSON.stringify(allGuessed));
};

const loadTime = dayjs();
export const getSecondsSinceLoaded = () =>
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

export const getNextUnguessedIndex = () => {
  const unguessedAvailbleIndices = availableIndices.filter(
    (index: any) => !getAllGuessed().includes(index)
  );
  if (unguessedAvailbleIndices.length) {
    return availableSongs.indexOf(gameSongs[unguessedAvailbleIndices[0]]);
  }
  return 0;
};
