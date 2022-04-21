import { Note, Pitch, AnswerStatus, Duration } from "src/types";
import { durationNames, pitchNames } from "src/constants";

// export const durationObjectToInt = (durationObject: DurationObject) => {
//     let result = 0;
//     result += 2 * durationObject["8n"];
//     result += 3 * durationObject["8n."];
//     result += 4 * durationObject["4n"];
//     result += 6 * durationObject["4n."];
//     result += 8 * durationObject["2n"];
//     result += 12 * durationObject["2n."];
//     result += 16 * durationObject["1n"];
//     result += 24 * durationObject["1n."];
//     return result;
//   };

export const incrementDuration = (
  notes: Array<Note>,
  index: number,
  increment: number,
  availableDurations: Array<Duration>
) => {
  let newDuration = notes[index].durationObject;
  const incrementFunc =
    increment > 0 ? nextElementInCycle : previousElementInCycle;
  increment = Math.abs(increment);
  while (increment !== 0) {
    newDuration = incrementFunc(
      newDuration,
      availableDurations,
      durationNames.map((durationName) => ({ [durationName]: 1 }))
    );
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

// Todo fix to work for duration
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
      guess.durationObject === correctNotes[index].durationObject
  );
};

export const areIdentical = (
  durationObject: Duration,
  durationObject2: Duration
) => {
  return JSON.stringify(durationObject) === JSON.stringify(durationObject2);
};

export const arrayIncludes = (
  durationObjectArray: Duration[],
  searchObject: Duration
) => {
  return durationObjectArray.some((durationObject) =>
    areIdentical(searchObject, durationObject)
  );
};

export const setIncludes = (
  durationObjectSet: Set<Duration>,
  searchObject: Duration
) => {
  return arrayIncludes(Array.from(durationObjectSet), searchObject);
};
