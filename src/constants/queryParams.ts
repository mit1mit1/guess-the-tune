import { maxAvailableArchiveSongs } from "./game";

export const paramStartCorrect = parseInt(
  new URLSearchParams(window.location.search).get("startCorrect") || "0"
);

export const composeMode = parseInt(
  new URLSearchParams(window.location.search).get("composeMode") || "0"
);

export const queryParamSongIndex =
  parseInt(
    new URLSearchParams(window.location.search).get("chosenSongIndex") || "-1"
  ) %
  (maxAvailableArchiveSongs + 1);

export const useUnreadySongs = parseInt(
  new URLSearchParams(window.location.search).get("unreadySongs") || "0"
);

export const queryParamSongHash = new URLSearchParams(
  window.location.search
).get("songHash");
