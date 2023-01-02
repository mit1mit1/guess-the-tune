import { pitchNames } from "src/constants";
import { correctNotes, correctPitches } from "src/constants/chosenSong";
import { composeMode } from "src/constants/queryParams";
import { paramStartCorrect } from "src/constants/queryParams";
import { AnswerStatus, Note, NoteStatus, Pitch } from "src/types";
import { isGuessable } from "src/utils/note";

export const minPitchIndex = Math.min(
  ...correctPitches.map((pitch: Pitch) => pitchNames.indexOf(pitch))
);
export const maxPitchIndex = Math.max(
  ...correctPitches.map((pitch: Pitch) => pitchNames.indexOf(pitch))
);

export const initialAvailablePitches = composeMode
  ? pitchNames.slice()
  : pitchNames.slice(minPitchIndex, maxPitchIndex + 1);

export const initialGuesses = paramStartCorrect
  ? correctNotes
  : correctNotes.map((note: Note) => ({
      pitch: isGuessable(note) ? correctNotes[0].pitch : note.pitch,
      durations: isGuessable(note)
        ? correctNotes[correctNotes.length - 1].durations
        : note.durations,
      staccato: note.staccato,
      rest: note.rest,
    }));

export const initialAnswerStatuses: Array<NoteStatus> = correctNotes.map(
  (note: Note, index: number) => {
    const status = {
      pitchStatus: isGuessable(note)
        ? AnswerStatus.UNKNOWN
        : AnswerStatus.UNGUESSABLE,
      durationStatus: isGuessable(note)
        ? AnswerStatus.UNKNOWN
        : AnswerStatus.UNGUESSABLE,
    };
    if (!composeMode && index === 0) {
      status.pitchStatus = AnswerStatus.GUESSEDCORRECT;
    }
    if (!composeMode && index === correctNotes.length - 1) {
      status.durationStatus = AnswerStatus.GUESSEDCORRECT;
    }
    return status;
  }
);
