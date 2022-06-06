import create from "zustand";
import {
  AnswerStatus,
  Duration,
  Note,
  NoteStatus,
  Pitch,
} from "./types";
import produce, { enableMapSet } from "immer";
import {
  getNewAnswerStatus,
  incrementDuration,
  incrementPitch,
  pushIfNotIdentical,
} from "./utils";
import { pitchNames } from "./constants";
import {
  allCorrect,
  areIdentical,
  arrayIncludes,
  getNewDurationAnswerStatus,
  getUniqueElements,
  isGuessable,
  orderByLength,
  setIncludes,
} from "./utils/game";
import { chosenSong, queryParamSongIndex } from "./constants/game";

enableMapSet();

const paramStartCorrect = parseInt(
  new URLSearchParams(window.location.search).get("startCorrect") || "0"
);
const correctNotes = chosenSong.notes;
const correctAvailableNotes = correctNotes.filter((note) => isGuessable(note));
const correctPitches = correctAvailableNotes.map((note) => note.pitch);
const correctDurations = correctAvailableNotes.map(
  (note) => note.durationObject
);

const minPitchIndex = Math.min(
  ...correctPitches.map((pitch) => pitchNames.indexOf(pitch))
);
const maxPitchIndex = Math.max(
  ...correctPitches.map((pitch) => pitchNames.indexOf(pitch))
);

export const initialAvailablePitches = pitchNames.slice(
  minPitchIndex,
  maxPitchIndex + 1
);

const initialGuesses = paramStartCorrect
  ? correctNotes
  : correctNotes.map((note) => ({
      pitch: isGuessable(note) ? initialAvailablePitches[0] : note.pitch,
      durationObject: isGuessable(note)
        ? correctDurations[0]
        : note.durationObject,
      staccato: note.staccato,
      rest: note.rest,
    }));

const initialAnswerStatuses: Array<NoteStatus> = correctNotes.map((note) => ({
  pitchStatus: isGuessable(note)
    ? AnswerStatus.UNKNOWN
    : AnswerStatus.UNGUESSABLE,
  durationStatus: isGuessable(note)
    ? AnswerStatus.UNKNOWN
    : AnswerStatus.UNGUESSABLE,
}));

export interface GameState {
  availablePitches: Array<Pitch>;
  availableDurations: Array<Duration>;
  selectedNoteIndex: number;
  turn: number;
  guessedEverythingCorrect: boolean;
  incrementTurn: () => void;
  incrementGuessPitch: (index: number, increment: number) => void;
  incrementGuessDuration: (index: number, increment: number) => void;
  setSelectedNoteIndex: (selectedNoteIndex: number) => void;
  setSelectedGuessDuration: (duration: Duration) => void;
  setSelectedGuessPitch: (pitch: Pitch) => void;
  guesses: Array<Note>;
  answerStatuses: Array<NoteStatus>;
  incorrectDurationsArrays: Array<Array<Duration>>;
  checkGuesses: () => void;
  incorrectPitchesArrays: Array<Array<Pitch>>;
  durationsGuessed: Set<Duration>;
  pitchesGuessed: Set<Pitch>;
  showInstructions: boolean;
  toggleInstructions: () => void;
  showSupportUs: boolean;
  toggleSupportUs: () => void;
  wrongSpotDurations: Set<Duration>;
  wrongSpotPitches: Set<Pitch>;
}
// const minDurationIndex = Math.min(
//   ...correctDurations.map((duration) => durationNames.indexOf(duration))
// );
// const maxDurationIndex = Math.max(
//   ...correctDurations.map((duration) => durationNames.indexOf(duration))
// );
// const initialAvailableDurations = durationNames.slice(
//   minDurationIndex,
//   maxDurationIndex + 1
// );

export const useStore: () => GameState = create<GameState>((set: any) => ({
  availablePitches: initialAvailablePitches,
  availableDurations: orderByLength(getUniqueElements(correctDurations)),
  answerStatuses: initialAnswerStatuses,
  durationsGuessed: new Set<Duration>([]),
  guessedEverythingCorrect: false,
  guesses: initialGuesses,
  incorrectDurationsArrays: correctNotes.map(() => []) as Array<
    Array<Duration>
  >,
  incorrectPitchesArrays: correctNotes.map(() => []) as Array<Array<Pitch>>,
  pitchesGuessed: new Set<Pitch>([]),
  selectedNoteIndex: 0,
  turn: 0,
  wrongSpotDurations: new Set<Duration>([]),
  wrongSpotPitches: new Set<Pitch>([]),
  showInstructions: queryParamSongIndex === -1,
  showSupportUs: false,

  toggleInstructions: () => {
    set(
      produce((draft: GameState) => {
        return {
          ...draft,
          showInstructions: !!!draft.showInstructions,
        };
      })
    );
  },

  toggleSupportUs: () => {
    set(
      produce((draft: GameState) => {
        return {
          ...draft,
          showSupportUs: !!!draft.showSupportUs,
        };
      })
    );
  },

  setSelectedNoteIndex: (selectedNoteIndex: number) =>
    set(
      produce((draft: GameState) => {
        return {
          ...draft,
          selectedNoteIndex,
        };
      })
    ),

  incrementTurn: () => {
    set(
      produce((draft: GameState) => ({
        ...draft,
        turn: draft.turn + 1,
      }))
    );
  },

  incrementGuessDuration: (guessIndex: number, increment: number) => {
    set(
      produce((draft: GameState) => {
        const newGuesses = incrementDuration(
          draft.guesses,
          guessIndex,
          increment,
          draft.availableDurations
        );
        return {
          ...draft,
          guesses: newGuesses,
        };
      })
    );
  },

  incrementGuessPitch: (guessIndex: number, increment: number) => {
    set(
      produce((draft: GameState) => {
        const newGuesses = incrementPitch(
          draft.guesses,
          guessIndex,
          increment,
          draft.availablePitches
        );
        return {
          ...draft,
          guesses: newGuesses,
        };
      })
    );
  },

  setSelectedGuessDuration: (duration: Duration) => {
    set(
      produce((draft: GameState) => {
        draft.guesses[draft.selectedNoteIndex].durationObject = duration;
        return draft;
      })
    );
  },

  setSelectedGuessPitch: (pitch: Pitch) => {
    set(
      produce((draft: GameState) => {
        draft.guesses[draft.selectedNoteIndex].pitch = pitch;
        return draft;
      })
    );
  },

  checkGuesses: () => {
    set(
      produce((draft: GameState) => {
        draft.guesses.forEach((guess, index) => {
          if (!isGuessable(correctNotes[index])) {
            return;
          }
          draft.pitchesGuessed.add(guess.pitch);
          draft.durationsGuessed.add(guess.durationObject);
          if (guess.pitch !== correctNotes[index].pitch) {
            draft.incorrectPitchesArrays = pushIfNotIdentical(
              draft.incorrectPitchesArrays,
              index,
              guess.pitch
            );
          }
          if (
            !areIdentical(
              guess.durationObject,
              correctNotes[index].durationObject
            )
          ) {
            draft.incorrectDurationsArrays = pushIfNotIdentical(
              draft.incorrectDurationsArrays,
              index,
              guess.durationObject
            );
          }
          if (correctPitches.indexOf(guess.pitch) === -1) {
            draft.availablePitches = draft.availablePitches.filter(
              (pitch) => pitch !== guess.pitch
            );
          }
          if (!arrayIncludes(correctDurations, guess.durationObject)) {
            draft.availableDurations.filter(
              (durationObject) =>
                !areIdentical(durationObject, guess.durationObject)
            );
          }
        });

        const newStatuses = correctNotes.map((note, index) => {
          if (!isGuessable(note)) {
            return {
              pitchStatus: draft.answerStatuses[index].pitchStatus,
              durationStatus: draft.answerStatuses[index].durationStatus,
            };
          }
          return {
            pitchStatus: getNewAnswerStatus(
              draft.answerStatuses[index].pitchStatus,
              note.pitch,
              draft.guesses[index].pitch
            ),
            durationStatus: getNewDurationAnswerStatus(
              draft.answerStatuses[index].durationStatus,
              note.durationObject,
              draft.guesses[index].durationObject
            ),
          } as NoteStatus;
        });
        draft.answerStatuses = newStatuses;

        draft.wrongSpotPitches = new Set();
        draft.wrongSpotDurations = new Set();
        correctNotes.forEach((note, index) => {
          if (!isGuessable(note)) {
            return;
          }
          if (
            draft.answerStatuses[index].pitchStatus !==
              AnswerStatus.GUESSEDCORRECT &&
            draft.pitchesGuessed.has(note.pitch)
          ) {
            draft.wrongSpotPitches.add(note.pitch);
          }
          if (
            draft.answerStatuses[index].durationStatus !==
              AnswerStatus.GUESSEDCORRECT &&
            setIncludes(draft.durationsGuessed, note.durationObject)
          ) {
            draft.wrongSpotDurations.add(note.durationObject);
          }
        });
        draft.guessedEverythingCorrect = allCorrect(
          draft.guesses,
          correctNotes
        );
      })
    );
  },
}));
