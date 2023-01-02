import { AnswerStatus } from "src/types";
import {
  allCorrect,
  getNewAnswerStatus,
  getNewDurationAnswerStatus,
} from "./checkAnswer";

describe("getNewDurationAnswerStatus", () => {
  it("sets status to correct when correct duration guessed", () => {
    expect(
      getNewDurationAnswerStatus(
        AnswerStatus.INCORRECTSOFAR,
        ["2n", "1n"],
        ["2n", "1n"]
      )
    ).toEqual(AnswerStatus.GUESSEDCORRECT);
  });

  it("maintains corrects status regardless of guess", () => {
    expect(
      getNewDurationAnswerStatus(
        AnswerStatus.GUESSEDCORRECT,
        ["2n", "1n"],
        ["2n", "1n"]
      )
    ).toEqual(AnswerStatus.GUESSEDCORRECT);
    expect(
      getNewDurationAnswerStatus(
        AnswerStatus.GUESSEDCORRECT,
        ["2n", "1n"],
        ["2n."]
      )
    ).toEqual(AnswerStatus.GUESSEDCORRECT);
  });

  it("maintains incorrect status when duration guess is incorrect", () => {
    expect(
      getNewDurationAnswerStatus(
        AnswerStatus.INCORRECTSOFAR,
        ["2n", "1n"],
        ["2n", "1n", "2n"]
      )
    ).toEqual(AnswerStatus.INCORRECTSOFAR);
    expect(
      getNewDurationAnswerStatus(
        AnswerStatus.INCORRECTSOFAR,
        ["2n", "1n"],
        ["2n."]
      )
    ).toEqual(AnswerStatus.INCORRECTSOFAR);
  });
});

describe("getNewAnswerStatus", () => {
  it("sets status to correct when correct pitch guessed", () => {
    expect(getNewAnswerStatus(AnswerStatus.INCORRECTSOFAR, "B4", "B4")).toEqual(
      AnswerStatus.GUESSEDCORRECT
    );
  });

  it("maintains corrects status regardless of guess", () => {
    expect(getNewAnswerStatus(AnswerStatus.GUESSEDCORRECT, "B4", "B4")).toEqual(
      AnswerStatus.GUESSEDCORRECT
    );
    expect(
      getNewAnswerStatus(AnswerStatus.GUESSEDCORRECT, "B4", "A#3")
    ).toEqual(AnswerStatus.GUESSEDCORRECT);
  });

  it("maintains incorrect status when pitch guess is incorrect", () => {
    expect(
      getNewAnswerStatus(AnswerStatus.INCORRECTSOFAR, "B4", "D#4")
    ).toEqual(AnswerStatus.INCORRECTSOFAR);
    expect(getNewAnswerStatus(AnswerStatus.INCORRECTSOFAR, "B4", "A5")).toEqual(
      AnswerStatus.INCORRECTSOFAR
    );
  });
});

describe("allCorrect", () => {
  it("returns true if all guessed pitches and durations match correct ones", () => {
    expect(allCorrect([], [])).toEqual(true);
    expect(
      allCorrect(
        [{ pitch: "A#3", durations: ["2n", "1n"] }],
        [{ pitch: "A#3", durations: ["1n", "2n"] }]
      )
    ).toEqual(true);
  });

  it("returns false if any guessed pitches and durations don't match correct ones", () => {
    expect(allCorrect([], [{ pitch: "A#3", durations: ["1n", "2n"] }])).toEqual(
      false
    );
    expect(allCorrect([{ pitch: "A#3", durations: ["1n", "2n"] }], [])).toEqual(
      false
    );
    expect(
      allCorrect(
        [{ pitch: "A#4", durations: ["2n", "1n"] }],
        [{ pitch: "A#3", durations: ["1n", "2n"] }]
      )
    ).toEqual(false);
  });
  expect(
    allCorrect(
      [{ pitch: "A#4", durations: ["2n", "1n"] }],
      [{ pitch: "A#4", durations: ["1n.", "2n"] }]
    )
  ).toEqual(false);
  expect(
    allCorrect(
      [{ pitch: "A#4", durations: ["2n", "1n"] }],
      [{ pitch: "A#4", durations: ["1n", "2n", "1n"] }]
    )
  ).toEqual(false);
});
