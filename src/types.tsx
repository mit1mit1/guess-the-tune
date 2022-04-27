import { pitchNames, durationNames } from "src/constants";

export interface Note {
  pitch: Pitch;
  durationObject: Duration;
  staccato?: boolean
}

export type Pitch = typeof pitchNames[number];

export type BaseDuration = typeof durationNames[number];

export type Duration = {
  [key in typeof durationNames[number]]?: number;
};

export const isPitch = (item: any): item is Pitch => {
  return pitchNames.includes(item);
};

export const isDuration = (item: any): item is BaseDuration => {
  return durationNames.includes(item);
};

export enum TimeSignature {
  FOURFOUR = "4/4",
}

export enum AnswerStatus {
  UNKNOWN,
  GUESSEDCORRECT,
  INCORRECTSOFAR,
}

export interface DurationObject {
  "16n": 0;
  "8n": 0;
  "8n.": 0;
  "4n": 0;
  "4n.": 0;
  "2n": 0;
  "2n.": 0;
  "1n": 0;
  "1n.": 0;
}

export interface NoteStatus {
  pitchStatus: AnswerStatus;
  durationStatus: AnswerStatus;
}

export interface GameSong {
  bpm: number;
  notes: Array<Note>;
  timeSignature: TimeSignature;
}
