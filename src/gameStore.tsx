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
);

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

if (!composeMode) {
  initialAnswerStatuses[0].pitchStatus = AnswerStatus.GUESSEDCORRECT;
  initialAnswerStatuses[initialAnswerStatuses.length - 1].durationStatus =
    AnswerStatus.GUESSEDCORRECT;
}


export interface GameState {
  addNote: () => void;
  answerStatuses: Array<NoteStatus>;
  availableDurations: Array<Duration>;
  availablePitches: Array<Pitch>;
  bpm: number;
  checkGuesses: () => void;
  correctNotes: Array<Note>;
  durationsGuessed: Set<Duration>;
  guessedEverythingCorrect: boolean;
  guesses: Array<Note>;
  incorrectDurationsArrays: Array<Array<Duration>>;
  incorrectPitchesArrays: Array<Array<Pitch>>;
  incrementGuessDuration: (index: number, increment: number) => void;
  incrementGuessPitch: (index: number, increment: number) => void;
  incrementTurn: () => void;
  overrideBPM: (bpm: number) => void;
  pitchesGuessed: Set<Pitch>;
  removeNote: () => void;
  selectedNoteIndex: number;
  setSelectedGuessDuration: (duration: Duration) => void;
  setSelectedGuessPitch: (pitch: Pitch) => void;
  setSelectedNoteIndex: (selectedNoteIndex: number) => void;
  showCongrats: boolean;
  showInstructions: boolean;
  showOutput: boolean;
  showSupportUs: boolean;
  switchIsRest: () => void;
  switchIsStaccato: () => void;
  toggleCongrats: () => void;
  toggleInstructions: () => void;
  toggleOutputModal: () => void;
  toggleSupportUs: () => void;
  turn: number;
  wrongSpotDurations: Set<Duration>;
  wrongSpotPitches: Set<Pitch>;
}

export const useStore: () => GameState = create<GameState>((set: any) => (
  {
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
    answerStatuses: initialAnswerStatuses,
    availableDurations: composeMode ? [...(getUniqueElements(correctDurations).filter(durations => durations.length > 1)), ...(durationNames.map(name => ([name])))] : orderByLength(getUniqueElements(correctDurations)),
    availablePitches: initialAvailablePitches,
    bpm: chosenSong.bpm,
    correctNotes: correctNotes,
    durationsGuessed: new Set<Duration>([]),
    guessedEverythingCorrect: alreadyGuessedTodays,
    guesses: initialGuesses,
    incorrectPitchesArrays: correctNotes.map(() => []) as Array<Array<Pitch>>,
    incorrectDurationsArrays: correctNotes.map(() => []) as Array<
      Array<Duration>
    >,
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
    incrementTurn: () => {
      set(
        produce((draft: GameState) => ({
          ...draft,
          turn: draft.turn + 1,
        }))
      );
    },
    overrideBPM: (bpm: number) => {
      set(
        produce((draft: GameState) => {
          return {
            ...draft,
            bpm,
          };
        })
      );
    },
    pitchesGuessed: new Set<Pitch>([]),
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
    selectedNoteIndex: 0,
    setSelectedGuessDuration: (duration: Duration) => {
      set(
        produce((draft: GameState) => {
          draft.guesses[draft.selectedNoteIndex].durations = duration;
          return draft;
        })
      );
    },
    setSelectedNoteIndex: (selectedNoteIndex: number) => {
      set(
        produce((draft: GameState) => {
          return {
            ...draft,
            selectedNoteIndex,
          };
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
    showCongrats: alreadyGuessedTodays && !composeMode,
    showInstructions: !playedBefore && !composeMode,
    showOutput: false,
    showSupportUs: false,
    switchIsStaccato: () => {
      set(
        produce((draft: GameState) => {
          draft.correctNotes[draft.selectedNoteIndex].staccato = !draft.correctNotes[draft.selectedNoteIndex].staccato;
          draft.guesses[draft.selectedNoteIndex].staccato = draft.correctNotes[draft.selectedNoteIndex].staccato;
        })
      );
    },
    switchIsRest: () => {
      set(
        produce((draft: GameState) => {
          draft.correctNotes[draft.selectedNoteIndex].rest = !draft.correctNotes[draft.selectedNoteIndex].rest;
          draft.guesses[draft.selectedNoteIndex].rest = draft.correctNotes[draft.selectedNoteIndex].rest;
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
    turn: 0,
    wrongSpotDurations: new Set<Duration>([]),
    wrongSpotPitches: new Set<Pitch>([]),
    checkGuesses: () => {
      set(
        produce((draft: GameState) => {
          if (composeMode) {
            return;
          }
          draft.guesses.forEach((guess, index) => {
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
  }
));
