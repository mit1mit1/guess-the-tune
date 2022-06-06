import dayjs from "dayjs";
import { gameSongs } from "src/gameSongs";

export const daysSinceBeginning = dayjs().diff("2022-05-31", "days");

export const queryParamSongIndex =
  parseInt(
    new URLSearchParams(window.location.search).get("chosenSongIndex") || "-1"
  ) %
  (daysSinceBeginning + 1);

const useUnreadySongs = parseInt(
  new URLSearchParams(window.location.search).get("unreadySongs") || "0"
);

const songIndex =
  queryParamSongIndex === -1 ? daysSinceBeginning : queryParamSongIndex;

const availableSongs = useUnreadySongs
  ? gameSongs
  : gameSongs.filter((gameSong) => !!gameSong.readyForProduction);

export const chosenSong =
  availableSongs[Math.abs(songIndex % availableSongs.length)];
