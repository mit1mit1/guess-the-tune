import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin
import { gameSongs } from "src/gameSongs";

dayjs.extend(utc)
dayjs.extend(timezone)

const userTimezone = dayjs.tz.guess()
const dawnOfFirstDay = dayjs.tz("2022-05-31 00:00", userTimezone)
export const maxAvailableArchiveSongs = dayjs().tz(userTimezone).diff(dawnOfFirstDay, "days");

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
