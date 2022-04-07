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

enableMapSet();

const correctNotes = gameSongs[1].notes;

const initialGuesses: Array<Note> = correctNotes.map(() => ({
  pitch: "C4",
  duration: "4n",
}));

const initialAnswerStatuses: Array<NoteStatus> = correctNotes.map(() => ({
  pitchStatus: AnswerStatus.UNKNOWN,
  durationStatus: AnswerStatus.UNKNOWN,
}));

export interface GuessState {
  selectedNote: number;
  incrementGuessPitch: (index: number, increment: number) => void;
  incrementGuessDuration: (index: number, increment: number) => void;
  setSelectedNote: (selectedNote: number) => void;
  guesses: Array<Note>;
  setGuesses: (guesses: Array<Note>) => void;
  answerStatuses: Array<NoteStatus>;
  setAnswerStatuses: (answerStatuses: Array<NoteStatus>) => void;
  incorrectDurationsArray: Array<Array<Duration>>;
  setIncorrectDurationsArray: (
    incorrectDurationsArray: Array<Array<Duration>>
  ) => void;
  checkGuesses: () => void;
  incorrectPitchesArray: Array<Array<Pitch>>;
  setIncorrectPitchesArray: (
    incorrectPitchesArray: Array<Array<Pitch>>
  ) => void;
  durationsGuessed: Set<Duration>;
  setDurationsGuessed: (durationsGuessed: Set<Duration>) => void;
  pitchesGuessed: Set<Pitch>;
  setPitchesGuessed: (pitchesGuessed: Set<Pitch>) => void;
  wrongSpotDurations: Set<Duration>;
  setWrongSpotDurations: (wrongSpotDurations: Set<Duration>) => void;
  wrongSpotPitches: Set<Pitch>;
  setWrongSpotPitches: (wrongSpotPitches: Set<Pitch>) => void;
}

export const useStore = create<GuessState>((set) => ({
  selectedNote: 0,
  setSelectedNote: (selectedNote) =>
    set(
      produce((draft) => ({
        ...draft,
        selectedNote,
      }))
    ),

  guesses: initialGuesses,
  setGuesses: (guesses) =>
    set(
      produce((state) => ({
        ...state,
        guesses,
      }))
    ),
  checkGuesses: () => {
    set(
      produce((draft: GuessState) => {
        draft.guesses.forEach((guess, index) => {
          draft.pitchesGuessed.add(guess.pitch);
          draft.durationsGuessed.add(guess.duration);
          if (guess.pitch !== correctNotes[index].pitch) {
            draft.incorrectPitchesArray = pushIfNotIdentical(
              draft.incorrectPitchesArray,
              index,
              guess.pitch
            );
          }
          if (guess.duration !== correctNotes[index].duration) {
            draft.incorrectDurationsArray = pushIfNotIdentical(
              draft.incorrectDurationsArray,
              index,
              guess.duration
            );
          }
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
        });
      })
    );
  },
  incrementGuessDuration: (guessIndex, increment) => {
    set(
      produce((draft) => {
        const newGuesses = incrementDuration(
          draft.guesses,
          guessIndex,
          increment
        );
        console.log("new state is " + newGuesses);
        return {
          ...draft,
          guesses: newGuesses,
        };
      })
    );
  },

  incrementGuessPitch: (guessIndex, increment) => {
    set(
      produce((draft) => {
        const newGuesses = incrementPitch(draft.guesses, guessIndex, increment);
        console.log("new state is " + newGuesses);
        return {
          ...draft,
          guesses: newGuesses,
        };
      })
    );
  },

  answerStatuses: initialAnswerStatuses,
  setAnswerStatuses: (answerStatuses) =>
    set(
      produce((state) => ({
        ...state,
        answerStatuses,
      }))
    ),

  incorrectDurationsArray: correctNotes.map(() => []) as Array<Array<Duration>>,
  setIncorrectDurationsArray: (incorrectDurationsArray) =>
    set(
      produce((state) => ({
        ...state,
        incorrectDurationsArray,
      }))
    ),

  incorrectPitchesArray: correctNotes.map(() => []) as Array<Array<Pitch>>,
  setIncorrectPitchesArray: (incorrectPitchesArray) =>
    set(
      produce((state) => ({
        ...state,
        incorrectPitchesArray,
      }))
    ),

  durationsGuessed: new Set<Duration>([]),
  setDurationsGuessed: (durationsGuessed) =>
    set(
      produce((state) => ({
        ...state,
        durationsGuessed,
      }))
    ),

  pitchesGuessed: new Set<Pitch>([]),
  setPitchesGuessed: (pitchesGuessed) =>
    set(
      produce((state) => ({
        ...state,
        pitchesGuessed,
      }))
    ),

  wrongSpotDurations: new Set<Duration>([]),
  setWrongSpotDurations: (wrongSpotDurations) =>
    set(
      produce((state) => ({
        ...state,
        wrongSpotDurations,
      }))
    ),

  wrongSpotPitches: new Set<Pitch>([]),
  setWrongSpotPitches: (wrongSpotPitches) =>
    set(
      produce((state) => ({
        ...state,
        wrongSpotPitches,
      }))
    ),
}));

// const [selectedNote, setSelectedNote] = useState(0);
// const [guesses, setGuesses] = useState(initialGuesses);
// const initialAnswerStatuses: Array<NoteStatus> = correctNotes.map(() => ({
//   pitchStatus: AnswerStatus.UNKNOWN,
//   durationStatus: AnswerStatus.UNKNOWN,
// }));
// const [answerStatuses, setAnswerStatuses] = useState(initialAnswerStatuses);
// const [incorrectPitchesArray, setIncorrectPitchesArray] = useState(
//   correctNotes.map(() => []) as Array<Array<Pitch>>
// );
// const [incorrectDurationsArray, setIncorrectDurationsArray] = useState(
//   correctNotes.map(() => []) as Array<Array<Duration>>
// );
// const [pitchesGuessed, setPitchesGuessed] = useState(new Set<Pitch>([]));
// const [durationsGuessed, setDurationsGuessed] = useState(
//   new Set<Duration>([])
// );
// const [wrongSpotPitches, setWrongSpotPitches] = useState(new Set<Pitch>([]));
// const [wrongSpotDurations, setWrongSpotDurations] = useState(
//   new Set<Duration>([])
// );
