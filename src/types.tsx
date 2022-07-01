import { pitchNames, durationNames } from "src/constants";

export interface Note {
  pitch: Pitch;
  durations: Array<BaseDuration>;
  staccato?: boolean;
  rest?: boolean;
}

export type Pitch = typeof pitchNames[number];

export type BaseDuration = typeof durationNames[number];

export type Duration = Array<BaseDuration>;

export type ToneJSDuration = {
  [key in typeof durationNames[number]]?: number;
};

export const isPitch = (item: any): item is Pitch => {
  return pitchNames.includes(item);
};

export const isDuration = (item: any): item is BaseDuration => {
  return durationNames.includes(item);
};

export enum TimeSignature {
  THREEFOUR = "3/4",
  FOURFOUR = "4/4",
  FIVEFOUR = "5/4",
  TWOTWO = "2/2",
}

export enum AnswerStatus {
  UNKNOWN,
  GUESSEDCORRECT,
  INCORRECTSOFAR,
  UNGUESSABLE,
}

export interface NoteStatus {
  pitchStatus: AnswerStatus;
  durationStatus: AnswerStatus;
}

export interface GameSong {
  bpm: number;
  notes: Array<Note>;
  timeSignature: TimeSignature;
  readyForProduction?: boolean;
  name: string;
}

export interface BaseSVGPathProps {
  color: string;
  opacity?: number;
  handleClick?: () => void;
}
