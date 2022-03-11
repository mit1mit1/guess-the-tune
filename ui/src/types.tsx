import { pitchNames, durationNames } from 'src/constants'

export interface Note {
  pitch: Pitch;
  duration: Duration;
}

export type Pitch = typeof pitchNames[number]

export type Duration = typeof durationNames[number]

export enum AnswerStatus {
  UNKNOWN,
  CORRECT,
  INCORRECT,
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
}
