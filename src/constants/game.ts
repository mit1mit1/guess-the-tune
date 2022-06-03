import dayjs from "dayjs";

export const daysSinceBeginning = dayjs().diff("2022-05-31", "days");

export const queryParamSongIndex =
  parseInt(
    new URLSearchParams(window.location.search).get("chosenSongIndex") || "-1"
  ) %
  (daysSinceBeginning + 1);
