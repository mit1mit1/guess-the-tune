import { gameSongs } from "src/gameSongs";
import {
  isLatestTune,
  availableIndices,
  availableSongs,
} from "src/constants/songHistory";
import dayjs from "dayjs";
import { chosenSongIndex } from "src/constants/chosenSong";
import { getAllGuessed } from "src/persistantState/dynamic";

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

export const getNextUnguessedIndex = () => {
  const unguessedAvailbleIndices = availableIndices.filter(
    (index: any) => !getAllGuessed().includes(index)
  );
  if (unguessedAvailbleIndices.length) {
    return availableSongs.indexOf(gameSongs[unguessedAvailbleIndices[0]]);
  }
  return 0;
};
