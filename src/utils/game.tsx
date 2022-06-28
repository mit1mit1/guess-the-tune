import { Note, Pitch, AnswerStatus, Duration, BaseDuration } from "src/types";
import { pitchNames } from "src/constants";
import { generatedGameSongs } from "src/utils/generator";
import { chosenSongIndex, isLatestTune, availableIndices, availableSongs } from "src/constants/game";
import dayjs from "dayjs";

const getIndex = (
  currentDurationObject: Duration,
  durationObjectArray: Duration[]
) => {
  return durationObjectArray.findIndex((element) =>
    areIdentical(currentDurationObject, element)
  );
};

const nextDuration = (
  currentDurationObject: Duration,
  durationObjectArray: Duration[]
) => {
  const index = getIndex(currentDurationObject, durationObjectArray);
  if (index === -1) {
    return durationObjectArray[durationObjectArray.length - 1];
  }
  if (index >= 0 && index < durationObjectArray.length - 1) {
    return durationObjectArray[index + 1];
  }
  return durationObjectArray[0];
};

const previousDuration = (
  currentDurationObject: Duration,
  durationObjectArray: Duration[]
) => {
  const index = getIndex(currentDurationObject, durationObjectArray);
  if (index === -1) {
    return durationObjectArray[0];
  }
  if (index > 0 && index <= durationObjectArray.length) {
    return durationObjectArray[index - 1];
  }
  return durationObjectArray[durationObjectArray.length - 1];
};

export const incrementDuration = (
  notes: Array<Note>,
  index: number,
  increment: number,
  availableDurations: Array<Duration>
) => {
  let newDurationObject = notes[index].durationObject;
  const incrementFunc = increment > 0 ? nextDuration : previousDuration;
  increment = Math.abs(increment);
  while (increment !== 0) {
    newDurationObject = incrementFunc(newDurationObject, availableDurations);
    increment--;
  }

  const newNotes = [...notes];
  const newNote: Note = {
    ...newNotes[index],
    durationObject: newDurationObject,
  };
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

export const unsharp = (pitch: Pitch) => pitch.replace("#", "") as Pitch;

export const getNewDurationAnswerStatus = <T extends Duration>(
  oldStatus: AnswerStatus,
  correctAnswer: T,
  guess: T
) => {
  if (oldStatus === AnswerStatus.GUESSEDCORRECT) {
    return oldStatus;
  }
  return areIdentical(correctAnswer, guess)
    ? AnswerStatus.GUESSEDCORRECT
    : AnswerStatus.INCORRECTSOFAR;
};

export const getNewAnswerStatus = <T extends Pitch>(
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
      areIdentical(guess.durationObject, correctNotes[index].durationObject)
  );
};

export const orderByLength = (durationArray: Array<Duration>) => {
  return durationArray.sort(
    (durationObjectA, durationObjectB) =>
      durationObjectTo16thCount(durationObjectA) -
      durationObjectTo16thCount(durationObjectB)
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

export const getUniqueElements = (durationArray: Array<Duration>) => {
  const newArray: Array<Duration> = [];
  durationArray.forEach((durationObject) => {
    if (getIndex(durationObject, newArray) === -1) {
      newArray.push(durationObject);
    }
  });
  return newArray;
};

export const durationToNumber = (duration: BaseDuration) => {
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
      return 5.33;
    case "4t":
      return 2.67;
    case "8t":
      return 1.33;
    case "16t":
      return 0.67;
  }
};

export const durationObjectTo16thCount = (durationObject: Duration) => {
  let current16s = 0;
  for (const [baseDuration, multiplier] of Object.entries(durationObject)) {
    current16s += multiplier * durationToNumber(baseDuration as BaseDuration);
  }
  return current16s;
};

export const addDurationObjects = (
  durationObject: Duration,
  durationObject2: Duration
) => {
  let newObject: Duration = { ...durationObject };
  for (const [baseDuration, multiplier] of Object.entries(durationObject2)) {
    let based = baseDuration as BaseDuration;
    newObject[based] = (newObject[based] || 0) + multiplier;
  }
  return newObject;
};

export const isGuessable = (note: Note) => {
  return !note.rest;
};

export const setTodaysGuessed = () => {
  if (isLatestTune) {
    localStorage.setItem("lastCorrectIndex", chosenSongIndex.toString());
  }
  const allGuessed = getAllGuessed();
  allGuessed.push(chosenSongIndex);
  localStorage.setItem("allGuessed", JSON.stringify(allGuessed));
};

const loadTime = dayjs();
export const getSecondsSinceLoaded = () =>
  dayjs().diff(loadTime, "s", true).toFixed(2);

export const setTodaysTime = () => {
  if (isLatestTune && !localStorage.getItem("lastTime")) {
    localStorage.setItem("lastTime", getSecondsSinceLoaded());
  }
};

export const getTimePlayed = () => {
  const storageLastTime = localStorage.getItem("lastTime");
  if (storageLastTime && isLatestTune) {
    return storageLastTime;
  }
  return getSecondsSinceLoaded();
};

export const setTodaysTurns = (guesses: number) => {
  if (isLatestTune && !localStorage.getItem("lastTurns")) {
    localStorage.setItem("lastTurns", guesses.toString());
  }
};

export const getTodaysTurns = () => {
  const storageLastTime = localStorage.getItem("lastTurns");
  return isLatestTune && storageLastTime;
};

export const getAllGuessed = () => {
  const allGuessedStorage = JSON.parse(localStorage.getItem("allGuessed") || "[]");
  if (!Array.isArray(allGuessedStorage)) {
    return [];
  }
  return allGuessedStorage;
}

export const getNextUnguessedIndex = () => {
  const unguessedAvailbleIndices = availableIndices.filter(index => !getAllGuessed().includes(index))
  if (unguessedAvailbleIndices.length) {
    return availableSongs.indexOf(generatedGameSongs[unguessedAvailbleIndices[0]]);
  }
  return 0;
}