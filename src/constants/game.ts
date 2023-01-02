import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import { gameSongs, midlyOpusOne } from "src/gameSongs";
import { decodeSong } from "src/utils";

dayjs.extend(utc);
dayjs.extend(timezone);

const userTimezone = dayjs.tz.guess();
const dawnOfFirstDay = dayjs.tz("2022-05-31 00:00", userTimezone);
export const maxAvailableArchiveSongs = dayjs()
  .tz(userTimezone)
  .diff(dawnOfFirstDay, "days");

export const composeMode = parseInt(
  new URLSearchParams(window.location.search).get("composeMode") || "0"
);

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
  ? gameSongs
  : gameSongs.filter((gameSong) => !!gameSong.readyForProduction);

export const availableIndices = availableSongs.map((availableSong) =>
  gameSongs.indexOf(availableSong)
);

export const queryParamSongHash = new URLSearchParams(
  window.location.search
).get("songHash");

const correctedSongIndex = Math.abs(songIndex % availableSongs.length);

export const chosenSong = queryParamSongHash
  ? decodeSong(queryParamSongHash.toString())
  : composeMode
  ? midlyOpusOne
  : availableSongs[correctedSongIndex];

export const chosenSongIndex = gameSongs.indexOf(chosenSong);

export const isLatestTune = queryParamSongIndex === -1 && !queryParamSongHash;

export const alreadyGuessedTodays =
  localStorage.getItem("lastCorrectIndex") === chosenSongIndex.toString() &&
  isLatestTune &&
  !composeMode;

export const playedBefore = !!localStorage.getItem("lastCorrectIndex");
