import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import { probabilisticGameSongs } from "src/utils/generatorProbability";
import { machineLearntSongs } from "src/utils/generatorMachineLearning";
import { generatedSongs } from "src/constants/generatedBangers";

dayjs.extend(utc);
dayjs.extend(timezone);

console.log(machineLearntSongs);

const userTimezone = dayjs.tz.guess();
const dawnOfFirstDay = dayjs.tz("2022-05-31 00:00", userTimezone);
export const maxAvailableArchiveSongs = dayjs()
  .tz(userTimezone)
  .diff(dawnOfFirstDay, "days");

export const queryParamSongIndex =
  parseInt(
    new URLSearchParams(window.location.search).get("chosenSongIndex") || "-1"
  ) %
  (maxAvailableArchiveSongs + 1);

const useUnreadySongs = parseInt(
  new URLSearchParams(window.location.search).get("unreadySongs") || "0"
);

const songIndex =
  queryParamSongIndex === -1 ? maxAvailableArchiveSongs : queryParamSongIndex;

export const availableSongs = useUnreadySongs
  ? generatedSongs
  : generatedSongs.filter((gameSong) => !!gameSong.readyForProduction);

export const availableIndices = availableSongs.map((availableSong) =>
  generatedSongs.indexOf(availableSong)
);

export const chosenSong =
  availableSongs[Math.abs(songIndex % availableSongs.length)];

export const chosenSongIndex = generatedSongs.indexOf(chosenSong);

export const isLatestTune = queryParamSongIndex === -1;

export const alreadyGuessedTodays =
  localStorage.getItem("lastCorrectIndex") === chosenSongIndex.toString() &&
  isLatestTune;

export const playedBefore = !!localStorage.getItem("lastCorrectIndex");
