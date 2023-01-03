import { Duration, Pitch } from "src/types";
import { GameStore } from "./store/types";

export const mockStore: GameStore = {
  addNote: () => {},
  answerStatuses: [],
  availableDurations: [],
  availablePitches: [],
  bpm: 0,
  checkGuesses: () => {},
  correctNotes: [],
  durationsGuessed: new Set([]),
  guessedEverythingCorrect: true,
  guesses: [],
  incorrectDurationsArrays: [],
  incorrectPitchesArrays: [],
  incrementGuessDuration: (index: number, increment: number) => {},
  incrementGuessPitch: (index: number, increment: number) => {},
  incrementTurn: () => {},
  overrideBPM: (bpm: number) => {},
  pitchesGuessed: new Set([]),
  removeNote: () => {},
  selectedNoteIndex: 0,
  setSelectedGuessDuration: (duration: Duration) => {},
  setSelectedGuessPitch: (pitch: Pitch) => {},
  setSelectedNoteIndex: (selectedNoteIndex: number) => {},
  showCongrats: false,
  showInstructions: false,
  showOutput: false,
  showSupportUs: false,
  switchIsRest: () => {},
  switchIsStaccato: () => {},
  toggleCongrats: () => {},
  toggleInstructions: () => {},
  toggleOutputModal: () => {},
  toggleSupportUs: () => {},
  turn: 0,
  wrongSpotDurations: new Set([]),
  wrongSpotPitches: new Set([]),
};

export class LocalStorageMock {
  store: Record<string | number, string>;
  length: number;
  key: (index: number) => "";
  constructor() {
    this.store = {};
    this.length = 0;
    this.key = (index: number) => "";
  }

  clear() {
    this.store = {};
  }

  getItem(key: string | number) {
    return this.store[key] || null;
  }

  setItem(key: string | number, value: any) {
    this.store[key] = String(value);
    this.length++;
  }

  removeItem(key: string | number) {
    delete this.store[key];
    this.length--;
  }
}
