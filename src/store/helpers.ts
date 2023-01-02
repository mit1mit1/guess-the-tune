import {
  correctDurations,
  correctNotes,
  correctPitches,
} from "src/constants/chosenSong";
import { AnswerStatus, Note, NoteStatus } from "src/types";
import {
  arrayIncludes,
  arraysIdentical,
  setIncludes,
} from "src/utils/arrayCompare";
import {
  getNewAnswerStatus,
  getNewDurationAnswerStatus,
} from "src/utils/checkAnswer";
import { pushIfNotIdentical } from "src/utils/arrayCompare";
import { isGuessable } from "src/utils/note";
import { GameStore } from "./types";

export const getNewStatuses = (
  correctNotes: Note[],
  guesses: Note[],
  answerStatuses: NoteStatus[]
) =>
  correctNotes.map((note: Note, index: number) => {
    if (!isGuessable(note)) {
      return {
        pitchStatus: answerStatuses[index].pitchStatus,
        durationStatus: answerStatuses[index].durationStatus,
      };
    }
    return {
      pitchStatus: getNewAnswerStatus(
        answerStatuses[index].pitchStatus,
        note.pitch,
        guesses[index].pitch
      ),
      durationStatus: getNewDurationAnswerStatus(
        answerStatuses[index].durationStatus,
        note.durations,
        guesses[index].durations
      ),
    } as NoteStatus;
  });

export const pushGuess = (
  draft: GameStore,
  guess: Note,
  guessIndex: number
) => {
  draft.pitchesGuessed.add(guess.pitch);
  draft.durationsGuessed.add(guess.durations);
  if (guess.pitch !== correctNotes[guessIndex].pitch) {
    draft.incorrectPitchesArrays = pushIfNotIdentical(
      draft.incorrectPitchesArrays,
      guessIndex,
      guess.pitch
    );
  }
  if (!arraysIdentical(guess.durations, correctNotes[guessIndex].durations)) {
    draft.incorrectDurationsArrays = pushIfNotIdentical(
      draft.incorrectDurationsArrays,
      guessIndex,
      guess.durations
    );
  }
  if (correctPitches.indexOf(guess.pitch) === -1) {
    draft.availablePitches = draft.availablePitches.filter(
      (pitch) => pitch !== guess.pitch
    );
  }
  if (!arrayIncludes(correctDurations, guess.durations)) {
    draft.availableDurations = draft.availableDurations.filter(
      (durations) => !arraysIdentical(durations, guess.durations)
    );
  }
};

export const pushWrongSpots = (
  draft: GameStore,
  correctNote: Note,
  correctNoteIndex: number
) => {
  if (
    draft.answerStatuses[correctNoteIndex].pitchStatus !==
      AnswerStatus.GUESSEDCORRECT &&
    draft.pitchesGuessed.has(correctNote.pitch)
  ) {
    draft.wrongSpotPitches.add(correctNote.pitch);
  }
  if (
    draft.answerStatuses[correctNoteIndex].durationStatus !==
      AnswerStatus.GUESSEDCORRECT &&
    setIncludes(draft.durationsGuessed, correctNote.durations)
  ) {
    draft.wrongSpotDurations.add(correctNote.durations);
  }
};
