export interface Note {
  pitch: string;
  duration: Duration;
}

export type Duration =
  | "16n"
  | "8n"
  | "8n."
  | "4n"
  | "4n."
  | "2n"
  | "2n."
  | "1n"
  | "1n.";

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
