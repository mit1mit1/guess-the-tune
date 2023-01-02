import { gameSongs, midlyOpusOne } from "src/gameSongs";
import { getLastCorrectIndex } from "src/persistantState/dynamic";
import { Note } from "src/types";
import { decodeSong } from "src/utils/encoder";
import { isGuessable } from "src/utils/note";
import { availableSongs, isLatestTune } from "./songHistory";

import {
  queryParamSongHash,
  queryParamSongIndex,
  composeMode,
} from "./queryParams";
import { maxAvailableArchiveSongs } from "./game";

const songIndex =
  queryParamSongIndex === -1 ? maxAvailableArchiveSongs : queryParamSongIndex;

const correctedSongIndex = Math.abs(songIndex % availableSongs.length);

export const chosenSong = queryParamSongHash
  ? decodeSong(queryParamSongHash.toString())
  : composeMode
  ? midlyOpusOne
  : availableSongs[correctedSongIndex];

export const chosenSongIndex = gameSongs.indexOf(chosenSong);

export const alreadyGuessedTodays =
  getLastCorrectIndex() === chosenSongIndex.toString() &&
  isLatestTune &&
  !composeMode;

export const correctNotes = chosenSong.notes;
export const correctAvailableNotes = correctNotes.filter((note: Note) =>
  isGuessable(note)
);
export const correctPitches = correctAvailableNotes.map(
  (note: { pitch: any }) => note.pitch
);
export const correctDurations = correctAvailableNotes.map(
  (note: { durations: any }) => note.durations
);
