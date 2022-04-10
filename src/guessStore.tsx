import create from "zustand";
import { gameSongs } from "./songs";
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

const correctNotes = gameSongs[1].notes;
const correctPitches = correctNotes.map((note) => note.pitch);
const correctDurations = correctNotes.map((note) => note.duration);

const initialGuesses: Array<Note> = correctNotes.map(() => ({
  pitch: "C4",
  duration: "4n",
}));

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
  guesses: Array<Note>;
  answerStatuses: Array<NoteStatus>;
  incorrectDurationsArrays: Array<Array<Duration>>;
  checkGuesses: () => void;
  incorrectPitchesArrays: Array<Array<Pitch>>;
  durationsGuessed: Set<Duration>;
  pitchesGuessed: Set<Pitch>;
  wrongSpotDurations: Set<Duration>;
  wrongSpotPitches: Set<Pitch>;
}

export const useStore = create<GuessState>((set) => ({
  availablePitches: [...pitchNames],
  availableDurations: [...durationNames],
  answerStatuses: initialAnswerStatuses,
  durationsGuessed: new Set<Duration>([]),
  guesses: initialGuesses,
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
      produce((draft) => ({
        ...draft,
        selectedNoteIndex,
      }))
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
