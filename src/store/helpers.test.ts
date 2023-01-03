import { AnswerStatus, Duration, Note, NoteStatus, Pitch } from "src/types";
import { GameStore } from "./types";
import { getNewStatuses, pushGuess, pushWrongSpots } from "./helpers";
import { mockStore } from "src/mocks";

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

describe("pushGuess", () => {
  it("adds guess information across the state", () => {
    const initialStore: GameStore = {
      ...mockStore,
      availablePitches: ["A#3", "A#4"],
      availableDurations: [["2n", "1n"], ["4n"]],
      incorrectDurationsArrays: [[]],
      incorrectPitchesArrays: [[]],
    };
    pushGuess(initialStore, { pitch: "A#3", durations: ["2n", "1n"] }, 0);
    expect(initialStore.incorrectDurationsArrays[0]).toEqual([["2n", "1n"]]);
    expect(initialStore.incorrectPitchesArrays[0]).toEqual(["A#3"]);
    expect(initialStore.availablePitches).toEqual(["A#4"]);
    expect(initialStore.availableDurations).toEqual([["4n"]]);
  });
});

describe("pushWrongSpots", () => {
  it("sets wrong spot pitches and durations if guessed elsewhere", () => {
    const initialStore: GameStore = {
      ...mockStore,
      answerStatuses: [
        {
          pitchStatus: AnswerStatus.INCORRECTSOFAR,
          durationStatus: AnswerStatus.GUESSEDCORRECT,
        },
      ],
      pitchesGuessed: new Set<Pitch>(["A#3", "A#4"]),
      durationsGuessed: new Set<Duration>([["2n", "1n"], ["4n"]]),
      wrongSpotDurations: new Set<Duration>([]),
      wrongSpotPitches: new Set<Pitch>([]),
    };
    pushWrongSpots(initialStore, { pitch: "A#3", durations: ["2n", "1n"] }, 0);
    expect(initialStore.wrongSpotDurations).not.toContain(["2n", "1n"]);
    expect(initialStore.wrongSpotPitches).toContain("A#3");
  });
});

// ;
