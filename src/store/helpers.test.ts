import { AnswerStatus, Note, NoteStatus } from "src/types";
import { getNewStatuses } from "./helpers";

describe("getNewStatuses", () => {
  it("ignores already guessed, marks correct guesses as correct, and marks incorrect as incorrect", () => {
    const correctNotes: Note[] = [
      {
        pitch: "A3",
        durations: ["2n"],
      },
      {
        pitch: "A4",
        durations: ["2n"],
      },
      {
        pitch: "A5",
        durations: ["2n"],
      },
      {
        pitch: "A5",
        durations: ["2n"],
        rest: true,
      },
    ];
    const guesses: Note[] = [
      {
        pitch: "B3",
        durations: ["2n"],
      },
      {
        pitch: "B4",
        durations: ["2n"],
      },
      {
        pitch: "A5",
        durations: ["2n"],
      },
      {
        pitch: "A5",
        durations: ["2n"],
        rest: true,
      },
    ];
    const answerStatuses: NoteStatus[] = [
      {
        pitchStatus: AnswerStatus.GUESSEDCORRECT,
        durationStatus: AnswerStatus.GUESSEDCORRECT,
      },
      {
        pitchStatus: AnswerStatus.INCORRECTSOFAR,
        durationStatus: AnswerStatus.INCORRECTSOFAR,
      },
      {
        pitchStatus: AnswerStatus.INCORRECTSOFAR,
        durationStatus: AnswerStatus.UNKNOWN,
      },
      {
        pitchStatus: AnswerStatus.UNGUESSABLE,
        durationStatus: AnswerStatus.UNGUESSABLE,
      },
    ];
    expect(getNewStatuses(correctNotes, guesses, answerStatuses)).toEqual([
      {
        pitchStatus: AnswerStatus.GUESSEDCORRECT,
        durationStatus: AnswerStatus.GUESSEDCORRECT,
      },
      {
        pitchStatus: AnswerStatus.INCORRECTSOFAR,
        durationStatus: AnswerStatus.GUESSEDCORRECT,
      },
      {
        pitchStatus: AnswerStatus.GUESSEDCORRECT,
        durationStatus: AnswerStatus.GUESSEDCORRECT,
      },
      {
        pitchStatus: AnswerStatus.UNGUESSABLE,
        durationStatus: AnswerStatus.UNGUESSABLE,
      },
    ]);
  });
});
