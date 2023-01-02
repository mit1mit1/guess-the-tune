import { Duration, Note, NoteStatus, Pitch } from "src/types";

export interface GameStore {
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
