import { BaseDuration, Duration, Note, ToneJSDuration } from "src/types";
import { arraysIdentical } from "./arrayCompare";

const getIndex = (
  currentDurationArray: Duration,
  durationArrayArray: Duration[]
) => {
  return durationArrayArray.findIndex((element) =>
    arraysIdentical(currentDurationArray, element)
  );
};

const nextDuration = (
  currentDurationArray: Duration,
  durationArrayArray: Duration[]
) => {
  const index = getIndex(currentDurationArray, durationArrayArray);
  if (index === -1) {
    return durationArrayArray[durationArrayArray.length - 1];
  }
  if (index >= 0 && index < durationArrayArray.length - 1) {
    return durationArrayArray[index + 1];
  }
  return durationArrayArray[0];
};

const previousDuration = (
  currentDurationArray: Duration,
  durationArrayArray: Duration[]
) => {
  const index = getIndex(currentDurationArray, durationArrayArray);
  if (index === -1) {
    return durationArrayArray[0];
  }
  if (index > 0 && index <= durationArrayArray.length) {
    return durationArrayArray[index - 1];
  }
  return durationArrayArray[durationArrayArray.length - 1];
};

export const incrementDuration = (
  notes: Array<Note>,
  index: number,
  increment: number,
  availableDurations: Array<Duration>
) => {
  let newDurationObject = notes[index].durations;
  const incrementFunc = increment > 0 ? nextDuration : previousDuration;
  increment = Math.abs(increment);
  while (increment !== 0) {
    newDurationObject = incrementFunc(newDurationObject, availableDurations);
    increment--;
  }

  const newNotes = [...notes];
  const newNote: Note = {
    ...newNotes[index],
    durations: newDurationObject,
  };
  newNotes[index] = newNote;
  return newNotes;
};

export const orderByLength = (durationArray: Array<Duration>) => {
  return durationArray.sort(
    (durationsA, durationsB) =>
      durationsTo16thCount(durationsA) - durationsTo16thCount(durationsB)
  );
};

export const getUniqueElements = (durationArray: Array<Duration>) => {
  const newArray: Array<Duration> = [];
  durationArray.forEach((durations) => {
    if (getIndex(durations, newArray) === -1) {
      newArray.push(durations);
    }
  });
  return newArray;
};

const durationToNumber = (duration: BaseDuration) => {
  switch (duration) {
    case "16n":
      return 1;
    case "8n":
      return 2;
    case "8n.":
      return 3;
    case "4n":
      return 4;
    case "4n.":
      return 6;
    case "2n":
      return 8;
    case "2n.":
      return 12;
    case "1n":
      return 16;
    case "1n.":
      return 24;
    case "2t":
      return 12;
    case "4t":
      return 16;
    case "8t":
      return 24;
    case "16t":
      return 24;
  }
};

export const durationsTo16thCount = (durations: Array<BaseDuration>) => {
  let current16s = 0;
  for (let i = 0; i < durations.length; i++) {
    current16s += durationToNumber(durations[i] as BaseDuration);
  }
  return current16s;
};

export const addDurationObjects = (
  durationObject: ToneJSDuration,
  durations: Array<BaseDuration>
) => {
  let newObject: ToneJSDuration = { ...durationObject };
  for (let i = 0; i < durations.length; i++) {
    let based = durations[i] as BaseDuration;
    newObject[based] = (newObject[based] || 0) + 1;
  }
  return newObject;
};
