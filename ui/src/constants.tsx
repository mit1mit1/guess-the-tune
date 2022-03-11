import { Duration } from "src/types";

export const pitchNames = [
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C4",
];

export const pitchMarks = pitchNames.map((name, index) => {
  return {
    value: index,
    label: name,
  };
});

export const durationNames: Array<Duration> = [
  "16n",
  "8n",
  "8n.",
  "4n",
  "4n.",
  "2n",
  "2n.",
  "1n",
  "1n.",
];

export const durationMarks = durationNames.map((name, index) => {
  return {
    value: index,
    label: name,
  };
});
