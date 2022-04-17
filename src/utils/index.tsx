import { Duration, DurationObject, Note, Pitch, AnswerStatus } from "src/types";
import * as Tone from "tone";
import { durationNames, pitchNames } from "src/constants";
export * from "./score";

export const incrementDuration = (
  notes: Array<Note>,
  index: number,
  increment: number,
  availableDurations: Array<Duration>
) => {
  let newDuration = notes[index].duration;
  const incrementFunc =
    increment > 0 ? nextElementInCycle : previousElementInCycle;
  increment = Math.abs(increment);
  while (increment !== 0) {
    newDuration = incrementFunc(newDuration, availableDurations, [
      ...durationNames,
    ]);
    increment--;
  }

  const newNotes = [...notes];
  const newNote = { ...newNotes[index], duration: newDuration };
  newNotes[index] = newNote;
  return newNotes;
};

export const incrementPitch = (
  notes: Array<Note>,
  index: number,
  increment: number,
  availablePitches: Array<Pitch> = [...pitchNames]
) => {
  let newPitch = notes[index].pitch;
  const incrementFunc =
    increment > 0 ? nextElementInCycle : previousElementInCycle;
  increment = Math.abs(increment);
  while (increment !== 0) {
    newPitch = incrementFunc(newPitch, availablePitches, [...pitchNames]);
    increment--;
  }

  const newNotes = [...notes];
  const newNote = { ...newNotes[index], pitch: newPitch };
  newNotes[index] = newNote;
  return newNotes;
};

const closestElement = <T extends any>(
  element: T,
  elementList: Array<T>,
  elementListSuperset: Array<T>
) => {
  let searchIndex = elementListSuperset.indexOf(element);
  if (searchIndex === -1 || searchIndex === 0) {
    return elementList[0];
  }
  if (searchIndex === elementListSuperset.length - 1) {
    return elementList[elementList.length - 1];
  }
  if (elementList.indexOf(elementListSuperset[searchIndex]) !== -1) {
    return elementList[searchIndex];
  }
  let add = 1;
  searchIndex += add;

  while (
    elementList.indexOf(elementListSuperset[searchIndex]) === -1 &&
    searchIndex > 0 &&
    searchIndex < elementListSuperset.length - 1
  ) {
    add = -(add + 1);
    searchIndex += add;
  }
  return elementListSuperset[searchIndex];
};

const nextElementInCycle = <T extends any>(
  element: T,
  elementList: Array<T>,
  elementListSuperset?: Array<T>
) => {
  const index = elementList.indexOf(element);
  if (index === -1 && elementListSuperset) {
    return closestElement(element, elementList, elementListSuperset);
  }
  if (index >= 0 && index < elementList.length - 1) {
    return elementList[index + 1];
  }
  return elementList[0];
};

const previousElementInCycle = <T extends any>(
  element: T,
  elementList: Array<T>,
  elementListSuperset?: Array<T>
) => {
  const index = elementList.indexOf(element);
  if (index === -1 && elementListSuperset) {
    return closestElement(element, elementList, elementListSuperset);
  }
  if (index >= 1) {
    return elementList[index - 1];
  }
  return elementList[elementList.length - 1];
};

export const pushIfNotIdentical = (
  oldArrayOfArrays: Array<Array<any>>,
  index: number,
  newItem: any
) => {
  const newArray = [...oldArrayOfArrays];
  if (oldArrayOfArrays[index].indexOf(newItem) === -1) {
    newArray[index].push(newItem);
  }
  return newArray;
};

export const playNotes = (notes: Array<Note>, bpm: number) => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.cancel();
  const synth = new Tone.Synth().toDestination();
  let current16s = 0;
  notes.forEach((note) => {
    Tone.Transport.schedule(() => {
      synth.triggerAttackRelease(note.pitch, note.duration);
    }, "0:0:" + current16s);
    current16s += durationToInt(note.duration);
  });
  Tone.Transport.position = 0;
  Tone.Transport.start();
};

export const durationToInt = (duration: Duration) => {
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
  }
};

export const durationObjectToInt = (durationObject: DurationObject) => {
  let result = 0;
  result += 2 * durationObject["8n"];
  result += 3 * durationObject["8n."];
  result += 4 * durationObject["4n"];
  result += 6 * durationObject["4n."];
  result += 8 * durationObject["2n"];
  result += 12 * durationObject["2n."];
  result += 16 * durationObject["1n"];
  result += 24 * durationObject["1n."];
  return result;
};

export const intToDuration = (countOf16s: number) => {
  switch (countOf16s) {
    case 1:
      return "16n";
    case 2:
      return "8n";
    case 4:
      return "4n";
    case 8:
      return "2n";
    default:
      return "1n";
  }
};

export const intToDurationObject = (countOf16s: number) => {
  return {
    "16n": countOf16s,
  };
};

export const getDivisionSymbol = (duration: Duration) => {
  switch (duration) {
    case "16n":
      return "/16";
    case "8n":
      return "/8";
    case "8n.":
      return "/8.";
    case "4n":
      return "/q";
    case "4n.":
      return "/q.";
    case "2n":
      return "/h";
    case "2n.":
      return "/h.";
    case "1n":
      return "/w";
    case "1n.":
      return "/w.";
  }
};

export const getNewAnswerStatus = <T extends Pitch | Duration>(
  oldStatus: AnswerStatus,
  correctAnswer: T,
  newAnswer: T
) => {
  if (oldStatus === AnswerStatus.GUESSEDCORRECT) {
    return oldStatus;
  }
  return correctAnswer === newAnswer
    ? AnswerStatus.GUESSEDCORRECT
    : AnswerStatus.INCORRECTSOFAR;
};

export const allCorrect = (guesses: Array<Note>, correctNotes: Array<Note>) => {
  return guesses.every(
    (guess, index) =>
      guess.pitch === correctNotes[index].pitch &&
      guess.duration === correctNotes[index].duration
  );
};
