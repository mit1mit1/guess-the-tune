import create from "zustand";
import { AnswerStatus, Duration, Note, NoteStatus, Pitch } from "./types";
import produce, { enableMapSet } from "immer";
import {
  getNewAnswerStatus,
  incrementDuration,
  incrementPitch,
  pushIfNotIdentical,
} from "./utils";
import { durationNames, pitchNames } from "./constants";
import {
  allCorrect,
  arraysIdentical,
  arrayIncludes,
  getNewDurationAnswerStatus,
  getUniqueElements,
  isGuessable,
  orderByLength,
  setIncludes,
  setTodaysGuessed,
  setTodaysTurns,
  setTodaysTime,
} from "./utils/game";
import {
  chosenSong,
  alreadyGuessedTodays,
  playedBefore,
  composeMode,
} from "./constants/game";

enableMapSet();

const paramStartCorrect = parseInt(
  new URLSearchParams(window.location.search).get("startCorrect") || "0"
);
const correctNotes = chosenSong.notes;
const correctAvailableNotes = correctNotes.filter((note: Note) => isGuessable(note));
const correctPitches = correctAvailableNotes.map((note: { pitch: any; }) => note.pitch);
const correctDurations = correctAvailableNotes.map(
  (note: { durations: any; }) => note.durations
);

const minPitchIndex = Math.min(
  ...correctPitches.map((pitch: Pitch) => pitchNames.indexOf(pitch))
);
const maxPitchIndex = Math.max(
  ...correctPitches.map((pitch: Pitch) => pitchNames.indexOf(pitch))
);

export const initialAvailablePitches = composeMode ? pitchNames.slice() : pitchNames.slice(
  minPitchIndex,
  maxPitchIndex + 1
);;

const initialGuesses = paramStartCorrect
  ? correctNotes
  : correctNotes.map((note: Note) => ({
    pitch: isGuessable(note) ? correctNotes[0].pitch : note.pitch,
    durations: isGuessable(note)
      ? correctNotes[correctNotes.length - 1].durations
      : note.durations,
    staccato: note.staccato,
    rest: note.rest,
  }));

const initialAnswerStatuses: Array<NoteStatus> = correctNotes.map((note: Note) => ({
  pitchStatus: isGuessable(note)
    ? AnswerStatus.UNKNOWN
    : AnswerStatus.UNGUESSABLE,
  durationStatus: isGuessable(note)
    ? AnswerStatus.UNKNOWN
    : AnswerStatus.UNGUESSABLE,
}));

initialAnswerStatuses[0].pitchStatus = AnswerStatus.GUESSEDCORRECT;
initialAnswerStatuses[initialAnswerStatuses.length - 1].durationStatus =
  AnswerStatus.GUESSEDCORRECT;

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
  toggleOutputModal: () => void;
  showOutput: boolean;
  showCongrats: boolean;
  toggleCongrats: () => void;
  wrongSpotDurations: Set<Duration>;
  wrongSpotPitches: Set<Pitch>;
  correctNotes: Array<Note>;
  addNote: () => void;
  removeNote: () => void;
}

export const useStore: () => GameState = create<GameState>((set: any) => ({
  showOutput: false,
  availablePitches: initialAvailablePitches,
  availableDurations: composeMode ? [...(getUniqueElements(correctDurations).filter(durations => durations.length > 1)), ...(durationNames.map(name => ([name])))] : orderByLength(getUniqueElements(correctDurations)),
  answerStatuses: initialAnswerStatuses,
  durationsGuessed: new Set<Duration>([]),
  guessedEverythingCorrect: alreadyGuessedTodays,
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
  showCongrats: alreadyGuessedTodays && !composeMode,
  showInstructions: !playedBefore && !composeMode,
  showSupportUs: false,
  correctNotes: correctNotes,
  addNote: () => {
    set(
      produce((draft: GameState) => {
        draft.correctNotes.push({
          durations: ["4n"],
          pitch: "C5"
        });
        draft.incorrectDurationsArrays.push([]);
        draft.incorrectPitchesArrays.push([]);
        draft.answerStatuses.push({
          pitchStatus: AnswerStatus.INCORRECTSOFAR,
          durationStatus: AnswerStatus.INCORRECTSOFAR,
        });
        draft.guesses.push({
          durations: ["4n"],
          pitch: "C5"
        });
      })
    );
  },
  removeNote: () => {
    set(
      produce((draft: GameState) => {
        draft.correctNotes.pop();
        draft.incorrectDurationsArrays.pop();
        draft.incorrectPitchesArrays.pop();
        draft.answerStatuses.pop();
        draft.guesses.pop();
      })
    );
  },
  toggleCongrats: () => {
    set(
      produce((draft: GameState) => {
        return {
          ...draft,
          showCongrats: !!!draft.showCongrats,
        };
      })
    );
  },
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
  toggleOutputModal: () => {
    set(
      produce((draft: GameState) => {
        return {
          ...draft,
          showOutput: !!!draft.showOutput,
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
        draft.guesses[draft.selectedNoteIndex].durations = duration;
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
          if (composeMode) {
            return;
          }
          if (!isGuessable(correctNotes[index])) {
            return;
          }
          draft.pitchesGuessed.add(guess.pitch);
          draft.durationsGuessed.add(guess.durations);
          if (guess.pitch !== correctNotes[index].pitch) {
            draft.incorrectPitchesArrays = pushIfNotIdentical(
              draft.incorrectPitchesArrays,
              index,
              guess.pitch
            );
          }
          if (
            !arraysIdentical(
              guess.durations,
              correctNotes[index].durations
            )
          ) {
            draft.incorrectDurationsArrays = pushIfNotIdentical(
              draft.incorrectDurationsArrays,
              index,
              guess.durations
            );
          }
          if (correctPitches.indexOf(guess.pitch) === -1) {
            draft.availablePitches = draft.availablePitches.filter(
              (pitch) => pitch !== guess.pitch
            );
          }
          if (!arrayIncludes(correctDurations, guess.durations)) {
            draft.availableDurations.filter(
              (durations) =>
                !arraysIdentical(durations, guess.durations)
            );
          }
        });

        const newStatuses = draft.correctNotes.map((note: Note, index: number) => {
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
              note.durations,
              draft.guesses[index].durations
            ),
          } as NoteStatus;
        });
        draft.answerStatuses = newStatuses;

        draft.wrongSpotPitches = new Set();
        draft.wrongSpotDurations = new Set();
        draft.correctNotes.forEach((note: Note, index: number) => {
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
            setIncludes(draft.durationsGuessed, note.durations)
          ) {
            draft.wrongSpotDurations.add(note.durations);
          }
        });
        draft.guessedEverythingCorrect = allCorrect(
          draft.guesses,
          draft.correctNotes
        );
        if (draft.guessedEverythingCorrect) {
          setTodaysGuessed();
          setTodaysTurns(draft.turn);
          setTodaysTime();
        }
        draft.showCongrats = draft.guessedEverythingCorrect;
      })
    );
  },
}));
