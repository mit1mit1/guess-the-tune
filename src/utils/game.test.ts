import { AnswerStatus } from "src/types";
import {
  getNewDurationAnswerStatus,
  incrementDuration,
  incrementPitch,
  pushIfNotIdentical,
  unsharp,
} from "./game";

describe("incrementDuration", () => {
  it("returns next duration in array of available durations", () => {
    const result = incrementDuration(
      [{ pitch: "A#3", durations: ["16n"], rest: true }],
      0,
      1,
      [["16n"], ["8n"], ["2n"]]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#3", durations: ["8n"], rest: true });
  });

  it("returns previous duration in array of available durations", () => {
    const result = incrementDuration(
      [{ pitch: "A#3", durations: ["8n"], rest: true }],
      0,
      -1,
      [["16n"], ["8n"], ["2n"]]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#3", durations: ["16n"], rest: true });
  });

  it("loops around array of available durations", () => {
    const result = incrementDuration(
      [{ pitch: "A#3", durations: ["2n"], rest: true }],
      0,
      1,
      [["16n"], ["8n"], ["2n"]]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#3", durations: ["16n"], rest: true });
  });
});

describe("incrementPitch", () => {
  it("returns next duration in array of available durations", () => {
    const result = incrementPitch(
      [{ pitch: "A#3", durations: ["16n"], rest: true }],
      0,
      1,
      ["A#3", "A#4", "A#5"]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#4", durations: ["16n"], rest: true });
  });

  it("returns previous duration in array of available durations", () => {
    const result = incrementPitch(
      [{ pitch: "A#4", durations: ["16n"], rest: true }],
      0,
      -1,
      ["A#3", "A#4", "A#5"]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#3", durations: ["16n"], rest: true });
  });

  it("loops around array of available durations", () => {
    const result = incrementPitch(
      [{ pitch: "A#5", durations: ["16n"], rest: true }],
      0,
      1,
      ["A#3", "A#4", "A#5"]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#3", durations: ["16n"], rest: true });
  });
});

describe("pushIfNotIdentical", () => {
  it("adds pitch to array of pitches if it isn't already there", () => {
    expect(pushIfNotIdentical([[]], 0, "A#3")).toEqual([["A#3"]]);
    expect(pushIfNotIdentical([[], []], 1, "A#3")).toEqual([[], ["A#3"]]);
    expect(pushIfNotIdentical([[], ["A#3"]], 1, "A#3")).toEqual([[], ["A#3"]]);
  });

  it("adds duration to array of durations if it isn't already there", () => {
    expect(pushIfNotIdentical([[]], 0, ["2n"])).toEqual([[["2n"]]]);
    expect(pushIfNotIdentical([[], []], 1, ["2n"])).toEqual([[], [["2n"]]]);
    expect(pushIfNotIdentical([[], [["2n"]]], 1, ["2n"])).toEqual([
      [],
      [["2n"]],
    ]);
  });
});

describe("unsharp", () => {
  it("removes sharp from a sharp pitch", () => {
    expect(unsharp("A#3")).toEqual("A3");
    expect(unsharp("D#4")).toEqual("D4");
  });

  it("maintains a non-sharp pitch", () => {
    expect(unsharp("A3")).toEqual("A3");
    expect(unsharp("D4")).toEqual("D4");
  });
});

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

  it("maintains incorrect status when guess is incorrect", () => {
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
