import { gameSongs } from "src/gameSongs";
import {
  useUnreadySongs,
  queryParamSongIndex,
  queryParamSongHash,
} from "./queryParams";

export const availableSongs = useUnreadySongs
  ? gameSongs
  : gameSongs.filter((gameSong) => !!gameSong.readyForProduction);

export const availableIndices = availableSongs.map((availableSong) =>
  gameSongs.indexOf(availableSong)
);

export const isLatestTune = queryParamSongIndex === -1 && !queryParamSongHash;
