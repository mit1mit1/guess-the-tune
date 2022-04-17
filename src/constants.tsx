export const pitchNames = [
  "E3",
  "F3",
  "F#3",
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
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5",
  "F5",
] as const;

export const pitchMarks = pitchNames.map((name, index) => {
  return {
    value: index,
    label: name,
  };
});

export const durationNames = [
  "16n",
  "8n",
  "8n.",
  "4n",
  "4n.",
  "2n",
  "2n.",
  "1n",
  "1n.",
] as const;

export const durationMarks = durationNames.map((name, index) => {
  return {
    value: index,
    label: name,
  };
});

export const BACKGROUND_COLOR = "black";
export const BASE_COLOR = "white";
export const WRONG_SPOT_COLOR = "yellow";
export const INCORRECT_COLOR = "grey";
