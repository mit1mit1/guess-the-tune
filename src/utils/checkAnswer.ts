import { AnswerStatus, Duration, Note, Pitch } from "src/types";
import { arraysIdentical } from "./arrayCompare";

export const getNewDurationAnswerStatus = <T extends Duration>(
  oldStatus: AnswerStatus,
  correctAnswer: T,
  guess: T
) => {
  if (oldStatus === AnswerStatus.GUESSEDCORRECT) {
    return oldStatus;
  }
  return arraysIdentical(correctAnswer, guess)
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
  if (guesses.length !== correctNotes.length) {
    return false;
  }
  return guesses.every(
    (guess, index) =>
      guess.pitch === correctNotes[index].pitch &&
      arraysIdentical(guess.durations, correctNotes[index].durations)
  );
};
