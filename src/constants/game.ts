import dayjs from "dayjs";
import { gameSongs } from "src/gameSongs";

export const maxAvailableArchiveSongs = dayjs().diff("2022-05-31", "days");

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

const availableSongs = useUnreadySongs
  ? gameSongs
  : gameSongs.filter((gameSong) => !!gameSong.readyForProduction);

export const chosenSong =
  availableSongs[Math.abs(songIndex % availableSongs.length)];
