import { gameSongs } from "src/gameSongs";
import {
  isLatestTune,
  availableIndices,
  availableSongs,
} from "src/constants/songHistory";
import dayjs from "dayjs";
import { chosenSongIndex } from "src/constants/chosenSong";
import { getAllGuessed } from "src/persistantState/dynamic";

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
