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
import { durationNames, pitchNames } from "./constants";

enableMapSet();

const paramSongIndex = parseInt(
  new URLSearchParams(window.location.search).get("chosenSongIndex") || "0"
);
const songIndex =
  paramSongIndex >= 0 && paramSongIndex < gameSongs.length ? paramSongIndex : 0;
const correctNotes = gameSongs[songIndex].notes;
const correctPitches = correctNotes.map((note) => note.pitch);
const correctDurations = correctNotes.map((note) => note.duration);

const initialAnswerStatuses: Array<NoteStatus> = correctNotes.map(() => ({
  pitchStatus: AnswerStatus.UNKNOWN,
  durationStatus: AnswerStatus.UNKNOWN,
}));

export interface GuessState {
  availablePitches: Array<Pitch>;
  availableDurations: Array<Duration>;
  selectedNoteIndex: number;
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
console.log(correctPitches, correctPitches.map((pitch) => pitchNames.indexOf(pitch)))
const minPitchIndex = Math.min(
  ...correctPitches.map((pitch) => pitchNames.indexOf(pitch))
);
const maxPitchIndex = Math.max(
  ...correctPitches.map((pitch) => pitchNames.indexOf(pitch))
);
const minDurationIndex = Math.min(
  ...correctDurations.map((duration) => durationNames.indexOf(duration))
);
const maxDurationIndex = Math.max(
  ...correctDurations.map((duration) => durationNames.indexOf(duration))
);
const initialAvailablePitches = pitchNames.slice(
  minPitchIndex,
  maxPitchIndex + 1
);
const initialAvailableDurations = durationNames.slice(
  minDurationIndex,
  maxDurationIndex + 1
);

export const useStore = create<GuessState>((set) => ({
  availablePitches: initialAvailablePitches,
  availableDurations: initialAvailableDurations,
  answerStatuses: initialAnswerStatuses,
  chosenSongIndex: songIndex,
  durationsGuessed: new Set<Duration>([]),
  guesses: correctNotes.map(() => ({
    pitch: initialAvailablePitches[0],
    duration: initialAvailableDurations[0],
  })),
  incorrectDurationsArrays: correctNotes.map(() => []) as Array<
    Array<Duration>
  >,
  incorrectPitchesArrays: correctNotes.map(() => []) as Array<Array<Pitch>>,
  pitchesGuessed: new Set<Pitch>([]),
  selectedNoteIndex: 0,
  wrongSpotDurations: new Set<Duration>([]),
  wrongSpotPitches: new Set<Pitch>([]),

  setSelectedNoteIndex: (selectedNoteIndex) =>
    set(
      produce((draft: GuessState) => {
        return {
          ...draft,
          selectedNoteIndex,
        };
      })
    ),

  incrementGuessDuration: (guessIndex, increment) => {
    set(
      produce((draft: GuessState) => {
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
      produce((draft: GuessState) => {
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
      produce((draft: GuessState) => {
        draft.guesses[draft.selectedNoteIndex].duration = duration;
        return draft;
      })
    );
  },

  setSelectedGuessPitch: (pitch) => {
    set(
      produce((draft: GuessState) => {
        draft.guesses[draft.selectedNoteIndex].pitch = pitch;
        return draft;
      })
    );
  },

  checkGuesses: () => {
    set(
      produce((draft: GuessState) => {
        draft.guesses.forEach((guess, index) => {
          draft.pitchesGuessed.add(guess.pitch);
          draft.durationsGuessed.add(guess.duration);
          if (guess.pitch !== correctNotes[index].pitch) {
            draft.incorrectPitchesArrays = pushIfNotIdentical(
              draft.incorrectPitchesArrays,
              index,
              guess.pitch
            );
          }
          if (guess.duration !== correctNotes[index].duration) {
            draft.incorrectDurationsArrays = pushIfNotIdentical(
              draft.incorrectDurationsArrays,
              index,
              guess.duration
            );
          }
          if (correctPitches.indexOf(guess.pitch) === -1) {
            draft.availablePitches = draft.availablePitches.filter(
              (pitch) => pitch !== guess.pitch
            );
          }
          if (correctDurations.indexOf(guess.duration) === -1) {
            draft.availableDurations.filter(
              (duration) => duration !== guess.duration
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
            durationStatus: getNewAnswerStatus(
              draft.answerStatuses[index].durationStatus,
              note.duration,
              draft.guesses[index].duration
            ),
          } as NoteStatus;
        });
        draft.answerStatuses = newStatuses;
        console.log(draft.answerStatuses);

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
            draft.durationsGuessed.has(note.duration)
          ) {
            draft.wrongSpotDurations.add(note.duration);
          }
        });
      })
    );
  },
}));
