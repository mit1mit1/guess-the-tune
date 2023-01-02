import {
  clefLength,
  maxNoteXLength,
  noteSharpOffsetAmount,
  rootCircleXRadius,
  timeSignatureWidth,
} from "src/constants/svg";
import { BaseDuration, Duration, Pitch } from "src/types";

export const shouldAddSharp = (pitch: Pitch) => {
  return pitch.includes("#");
};

export const numberOfNotePaths = (durations: Duration) => {
  return durations.length;
};

export const getBaseYPosition = (pitch: Pitch) => {
  const C4Offset = 425;
  const multiplier = 37.5;
  switch (pitch) {
    case "E3":
      return C4Offset + multiplier * 5;
    case "F3":
    case "F#3":
      return C4Offset + multiplier * 4;
    case "G3":
    case "G#3":
      return C4Offset + multiplier * 3;
    case "A3":
    case "A#3":
      return C4Offset + multiplier * 2;
    case "B3":
      return C4Offset + multiplier * 1;
    case "C4":
    case "C#4":
      return C4Offset;
    case "D4":
    case "D#4":
      return C4Offset + multiplier * -1;
    case "E4":
      return C4Offset + multiplier * -2;
    case "F4":
    case "F#4":
      return C4Offset + multiplier * -3;
    case "G4":
    case "G#4":
      return C4Offset + multiplier * -4;
    case "A4":
    case "A#4":
      return C4Offset + multiplier * -5;
    case "B4":
      return C4Offset + multiplier * -6;
    case "C5":
    case "C#5":
      return C4Offset + multiplier * -7;
    case "D5":
    case "D#5":
      return C4Offset + multiplier * -8;
    case "E5":
      return C4Offset + multiplier * -9;
    case "F5":
    case "F#5":
      return C4Offset + multiplier * -10;
    case "G5":
    case "G#5":
      return C4Offset + multiplier * -11;
    case "A5":
    case "A#5":
      return C4Offset + multiplier * -12;
    case "B5":
      return C4Offset + multiplier * -13;
  }
};

export const getRootCircleCX = (baseXPosition: number) => {
  return baseXPosition - 38;
};

export const shouldAddDurationDot = (duration: BaseDuration) => {
  return duration.includes(".");
};

export const shouldAddTripletSymbol = (duration: BaseDuration) => {
  return duration.includes("t");
};

export const getDurationDotXCentre = (baseXPosition: number) => {
  return baseXPosition + 19;
};

export const noteSharpOffset = (pitch: Pitch) => {
  return noteSharpOffsetAmount * (shouldAddSharp(pitch) ? 1 : -1);
};

export const getTripletCX = (baseXPosition: number) => {
  return baseXPosition - 1.5 * rootCircleXRadius;
};

const incorrectPitchLength = 250;

const distanceBetweenNotes = 3 * maxNoteXLength;

export const getBaseXPosition = (noteIndex: number, staveIndex: number) => {
  return (
    clefLength +
    (staveIndex === 0 ? timeSignatureWidth * 3 : 0) +
    incorrectPitchLength +
    noteIndex * distanceBetweenNotes
  );
};
