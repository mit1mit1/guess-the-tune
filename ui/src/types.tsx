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
