import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import { generatedGameSongs } from "src/utils/generator";

dayjs.extend(utc);
dayjs.extend(timezone);

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
  ? generatedGameSongs
  : generatedGameSongs.filter((gameSong) => !!gameSong.readyForProduction);

export const availableIndices = availableSongs.map(availableSong => generatedGameSongs.indexOf(availableSong));

export const chosenSong =
  availableSongs[Math.abs(songIndex % availableSongs.length)];

export const chosenSongIndex = generatedGameSongs.indexOf(chosenSong);

export const isLatestTune = queryParamSongIndex === -1;

export const alreadyGuessedTodays =
  localStorage.getItem("lastCorrectIndex") === chosenSongIndex.toString() &&
  isLatestTune;

export const playedBefore = !!localStorage.getItem("lastCorrectIndex");
