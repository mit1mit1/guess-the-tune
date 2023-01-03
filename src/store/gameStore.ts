import create from "zustand";
import { AnswerStatus, Duration, Note, Pitch } from "../types";
import produce, { enableMapSet } from "immer";
import { durationNames } from "src/constants";
import { composeMode } from "src/constants/queryParams";
import { playedBefore } from "src/persistantState/constants";
import { setSongIndexGuessed } from "src/persistantState/dynamic";
import { getNewStatuses, pushGuess, pushWrongSpots } from "./helpers";
import {
  alreadyGuessedTodays,
  chosenSong,
  chosenSongIndex,
  correctDurations,
  correctNotes,
} from "src/constants/chosenSong";
import { setTodaysTime } from "src/persistantState/dynamic";
import { isGuessable } from "src/utils/note";
import { incrementPitch } from "src/utils/pitch";
import {
  getUniqueElements,
  incrementDuration,
  orderByLength,
} from "src/utils/duration";
import { allCorrect } from "src/utils/checkAnswer";
import { setTodaysTurns } from "src/persistantState/dynamic";
import {
  initialAnswerStatuses,
  initialAvailablePitches,
  initialGuesses,
} from "./constants";
import { GameStore } from "./types";

enableMapSet();

export const useStore: () => GameStore = create<GameStore>((set: any) => ({
  addNote: () => {
    set(
      produce((draft: GameStore) => {
        draft.correctNotes.push({
          durations: ["4n"],
          pitch: "C5",
        });
        draft.incorrectDurationsArrays.push([]);
        draft.incorrectPitchesArrays.push([]);
        draft.answerStatuses.push({
          pitchStatus: AnswerStatus.INCORRECTSOFAR,
          durationStatus: AnswerStatus.INCORRECTSOFAR,
        });
        draft.guesses.push({
          durations: ["4n"],
          pitch: "C5",
        });
      })
    );
  },
  answerStatuses: initialAnswerStatuses,
  availableDurations: composeMode
    ? [
        ...getUniqueElements(correctDurations).filter(
          (durations) => durations.length > 1
        ),
        ...durationNames.map((name) => [name]),
      ]
    : orderByLength(getUniqueElements(correctDurations)),
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
      produce((draft: GameStore) => {
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
      produce((draft: GameStore) => {
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
      produce((draft: GameStore) => ({
        ...draft,
        turn: draft.turn + 1,
      }))
    );
  },
  overrideBPM: (bpm: number) => {
    set(
      produce((draft: GameStore) => {
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
      produce((draft: GameStore) => {
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
      produce((draft: GameStore) => {
        draft.guesses[draft.selectedNoteIndex].durations = duration;
        return draft;
      })
    );
  },
  setSelectedNoteIndex: (selectedNoteIndex: number) => {
    set(
      produce((draft: GameStore) => {
        return {
          ...draft,
          selectedNoteIndex,
        };
      })
    );
  },
  setSelectedGuessPitch: (pitch: Pitch) => {
    set(
      produce((draft: GameStore) => {
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
      produce((draft: GameStore) => {
        draft.correctNotes[draft.selectedNoteIndex].staccato =
          !draft.correctNotes[draft.selectedNoteIndex].staccato;
        draft.guesses[draft.selectedNoteIndex].staccato =
          draft.correctNotes[draft.selectedNoteIndex].staccato;
      })
    );
  },
  switchIsRest: () => {
    set(
      produce((draft: GameStore) => {
        draft.correctNotes[draft.selectedNoteIndex].rest =
          !draft.correctNotes[draft.selectedNoteIndex].rest;
        draft.guesses[draft.selectedNoteIndex].rest =
          draft.correctNotes[draft.selectedNoteIndex].rest;
      })
    );
  },
  toggleCongrats: () => {
    set(
      produce((draft: GameStore) => {
        return {
          ...draft,
          showCongrats: !!!draft.showCongrats,
        };
      })
    );
  },
  toggleInstructions: () => {
    set(
      produce((draft: GameStore) => {
        return {
          ...draft,
          showInstructions: !!!draft.showInstructions,
        };
      })
    );
  },
  toggleOutputModal: () => {
    set(
      produce((draft: GameStore) => {
        return {
          ...draft,
          showOutput: !!!draft.showOutput,
        };
      })
    );
  },
  toggleSupportUs: () => {
    set(
      produce((draft: GameStore) => {
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
      produce((draft: GameStore) => {
        if (composeMode) {
          return;
        }
        draft.guesses.forEach((guess, index) => {
          if (!isGuessable(correctNotes[index])) {
            return;
          }
          pushGuess(draft, guess, index);
        });

        draft.answerStatuses = getNewStatuses(
          draft.correctNotes,
          draft.guesses,
          draft.answerStatuses
        );

        draft.wrongSpotPitches = new Set();
        draft.wrongSpotDurations = new Set();
        draft.correctNotes.forEach((note: Note, index: number) => {
          if (!isGuessable(note)) {
            return;
          }
          pushWrongSpots(draft, note, index);
        });
        draft.guessedEverythingCorrect = allCorrect(
          draft.guesses,
          draft.correctNotes
        );
        if (draft.guessedEverythingCorrect) {
          setSongIndexGuessed(chosenSongIndex);
          setTodaysTurns(draft.turn);
          setTodaysTime();
        }
        draft.showCongrats = draft.guessedEverythingCorrect;
      })
    );
  },
}));
