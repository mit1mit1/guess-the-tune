import create from "zustand";
import { gameSongs } from "./songs";
import { AnswerStatus, Duration, Note, NoteStatus, Pitch } from "./types";

const chosenSong = gameSongs[1];
const initialGuesses: Array<Note> = chosenSong.notes.map(() => ({
  pitch: "C4",
  duration: "4n",
}));

const initialAnswerStatuses: Array<NoteStatus> = chosenSong.notes.map(() => ({
  pitchStatus: AnswerStatus.UNKNOWN,
  durationStatus: AnswerStatus.UNKNOWN,
}));
interface GuessState {
  selectedNote: number;
  setSelectedNote: (selectedNote: number) => void;
  guesses: Array<Note>;
  setGuesses: (guesses: Array<Note>) => void;
  answerStatuses: Array<NoteStatus>;
  setAnswerStatuses: (answerStatuses: Array<NoteStatus>) => void;
  incorrectDurationsArray: Array<Array<Duration>>;
  setIncorrectDurationsArray: (incorrectDurationsArray: Array<Array<Duration>>) => void;
  incorrectPitchesArray: Array<Array<Pitch>>;
  setIncorrectPitchesArray: (incorrectPitchesArray:  Array<Array<Pitch>>) => void;
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
    set((state) => ({
      ...state,
      selectedNote
    })),

    guesses: initialGuesses,
    setGuesses: (guesses) =>
    set((state) => ({
      ...state,
      guesses
    })),

    answerStatuses: initialAnswerStatuses,
    setAnswerStatuses: (answerStatuses) =>
      set((state) => ({
        ...state,
        answerStatuses
    })),


    incorrectDurationsArray: chosenSong.notes.map(() => []) as Array<Array<Duration>>,
    setIncorrectDurationsArray: (incorrectDurationsArray) =>
      set((state) => ({
        ...state,
        incorrectDurationsArray
    })),

    incorrectPitchesArray: chosenSong.notes.map(() => []) as Array<Array<Pitch>>,
    setIncorrectPitchesArray: (incorrectPitchesArray) =>
      set((state) => ({
        ...state,
        incorrectPitchesArray
    })),

    durationsGuessed: new Set<Duration>([]),
    setDurationsGuessed: (durationsGuessed) =>
      set((state) => ({
        ...state,
        durationsGuessed
    })),

    pitchesGuessed: new Set<Pitch>([]),
    setPitchesGuessed: (pitchesGuessed) =>
      set((state) => ({
        ...state,
        pitchesGuessed
    })),

    wrongSpotDurations: new Set<Duration>([]),
    setWrongSpotDurations: (wrongSpotDurations) =>
      set((state) => ({
        ...state,
        wrongSpotDurations
    })),

    wrongSpotPitches: new Set<Pitch>([]),
    setWrongSpotPitches: (wrongSpotPitches) =>
      set((state) => ({
        ...state,
        wrongSpotPitches
    })),
}));


  // const [selectedNote, setSelectedNote] = useState(0);
  // const [guesses, setGuesses] = useState(initialGuesses);
  // const initialAnswerStatuses: Array<NoteStatus> = chosenSong.notes.map(() => ({
  //   pitchStatus: AnswerStatus.UNKNOWN,
  //   durationStatus: AnswerStatus.UNKNOWN,
  // }));
  // const [answerStatuses, setAnswerStatuses] = useState(initialAnswerStatuses);
  // const [incorrectPitchesArray, setIncorrectPitchesArray] = useState(
  //   chosenSong.notes.map(() => []) as Array<Array<Pitch>>
  // );
  // const [incorrectDurationsArray, setIncorrectDurationsArray] = useState(
  //   chosenSong.notes.map(() => []) as Array<Array<Duration>>
  // );
  // const [pitchesGuessed, setPitchesGuessed] = useState(new Set<Pitch>([]));
  // const [durationsGuessed, setDurationsGuessed] = useState(
  //   new Set<Duration>([])
  // );
  // const [wrongSpotPitches, setWrongSpotPitches] = useState(new Set<Pitch>([]));
  // const [wrongSpotDurations, setWrongSpotDurations] = useState(
  //   new Set<Duration>([])
  // );