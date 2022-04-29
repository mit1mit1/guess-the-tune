import create from "zustand";
import { gameSongs } from "./gameSongs";
import { AnswerStatus, Duration, Note, NoteStatus, Pitch } from "./types";
import produce, { enableMapSet } from "immer";
import {
  getNewAnswerStatus,
  incrementDuration,
  incrementPitch,
  pushIfNotIdentical,
} from "./utils";
import { pitchNames } from "./constants";
import {
  areIdentical,
  arrayIncludes,
  getNewDurationAnswerStatus,
  getUniqueElements,
  orderByLength,
  setIncludes,
} from "./utils/game";

enableMapSet();

const paramSongIndex = parseInt(
  new URLSearchParams(window.location.search).get("chosenSongIndex") || "7"
);

const paramStartCorrect = parseInt(
  new URLSearchParams(window.location.search).get("startCorrect") || "0"
);
const songIndex =
  paramSongIndex >= 0 && paramSongIndex < gameSongs.length ? paramSongIndex : 0;
const correctNotes = gameSongs[songIndex].notes;
const correctPitches = correctNotes.map((note) => note.pitch);
const correctDurations = correctNotes.map((note) => note.durationObject);

const minPitchIndex = Math.min(
  ...correctPitches.map((pitch) => pitchNames.indexOf(pitch))
);
const maxPitchIndex = Math.max(
  ...correctPitches.map((pitch) => pitchNames.indexOf(pitch))
);

const initialAvailablePitches = pitchNames.slice(
  minPitchIndex,
  maxPitchIndex + 1
);

const initialGuesses = paramStartCorrect ? correctNotes : correctNotes.map((note) => ({
  pitch: initialAvailablePitches[0],
  durationObject: correctDurations[0],
  staccato: note.staccato,
}))

const initialAnswerStatuses: Array<NoteStatus> = correctNotes.map(() => ({
  pitchStatus: AnswerStatus.UNKNOWN,
  durationStatus: AnswerStatus.UNKNOWN,
}));

export interface GameState {
  availablePitches: Array<Pitch>;
  availableDurations: Array<Duration>;
  selectedNoteIndex: number;
  turn: number;
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
  wrongSpotDurations: Set<Duration>;
  wrongSpotPitches: Set<Pitch>;
  chosenSongIndex: number;
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

export const useStore = create<GameState>((set) => ({
  availablePitches: initialAvailablePitches,
  availableDurations: orderByLength(getUniqueElements(correctDurations)),
  answerStatuses: initialAnswerStatuses,
  chosenSongIndex: songIndex,
  durationsGuessed: new Set<Duration>([]),
  guesses: initialGuesses,
  incorrectDurationsArrays: correctNotes.map(() => []) as Array<
    Array<Duration>
  >,
  incorrectPitchesArrays: correctNotes.map(() => []) as Array<Array<Pitch>>,
  pitchesGuessed: new Set<Pitch>([]),
  selectedNoteIndex: 0,
  turn: 1,
  wrongSpotDurations: new Set<Duration>([]),
  wrongSpotPitches: new Set<Pitch>([]),

  setSelectedNoteIndex: (selectedNoteIndex) =>
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
      produce((draft) => ({
        ...draft,
        turn: draft.turn + 1,
      }))
    );
  },

  incrementGuessDuration: (guessIndex, increment) => {
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

  incrementGuessPitch: (guessIndex, increment) => {
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

  setSelectedGuessDuration: (duration) => {
    set(
      produce((draft: GameState) => {
        draft.guesses[draft.selectedNoteIndex].durationObject = duration;
        return draft;
      })
    );
  },

  setSelectedGuessPitch: (pitch) => {
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
      })
    );
  },
}));
