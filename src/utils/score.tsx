import { Pitch } from "src/types";

export const shouldAddSharp = (pitch: Pitch) => {
  return pitch.includes("#");
};

export const getBaseYPosition = (pitch: Pitch) => {
  switch (pitch) {
    case "E3":
      return 612.5;
    case "F3":
    case "F#3":
      return 575;
    case "G3":
    case "G#3":
      return 537.5;
    case "A3":
    case "A#3":
      return 500;
    case "B3":
      return 462.5;
    case "C4":
    case "C#4":
      return 425;
    case "D4":
    case "D#4":
      return 387.5;
    case "E4":
      return 350;
    case "F4":
    case "F#4":
      return 312.5;
    case "G4":
    case "G#4":
      return 275;
    case "A4":
    case "A#4":
      return 237.5;
    case "B4":
      return 200;
    case "C5":
    case "C#5":
      return 162.5;
    case "D5":
    case "D#5":
      return 125;
    case "E5":
      return 87.5;
    case "F5":
      return 50;
  }
};

export const getRootCircleCX = (baseXPosition: number) => {
  return baseXPosition - 38;
};
