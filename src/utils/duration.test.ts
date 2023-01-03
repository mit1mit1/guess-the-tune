import {
  addDurationObjects,
  incrementDuration,
  orderByLength,
} from "./duration";

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

  it("returns next duration when next is multinote durations", () => {
    const result = incrementDuration(
      [{ pitch: "A#3", durations: ["16n"], rest: true }],
      0,
      1,
      [["16n"], ["8n", "1n"], ["2n"]]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      pitch: "A#3",
      durations: ["8n", "1n"],
      rest: true,
    });
  });

  it("returns next duration when current is multinote durations", () => {
    const result = incrementDuration(
      [{ pitch: "A#3", durations: ["8n", "1n"], rest: true }],
      0,
      1,
      [["16n"], ["8n", "1n"], ["2n"]]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#3", durations: ["2n"], rest: true });
  });

  it("picks last duration when incrementing and current duration is unavailable", () => {
    const result = incrementDuration(
      [{ pitch: "A#5", durations: ["4n", "16n"], rest: true }],
      0,
      1,
      [["8n"], ["4n"], ["1n"]]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#5", durations: ["1n"], rest: true });
  });

  it("picks first duration when decrementing and current duration is unavailable", () => {
    const result = incrementDuration(
      [{ pitch: "A#5", durations: ["4n", "16n"], rest: true }],
      0,
      -1,
      [["8n"], ["4n"], ["1n"]]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "A#5", durations: ["8n"], rest: true });
  });
});

describe("orderByLength correctly orders durations in increasing length", () => {
  const result = orderByLength([
    ["4n"],
    ["16n"],
    ["8n"],
    [
      "16n",
      "8n",
      "8n.",
      "4n",
      "4n.",
      "2n",
      "2n.",
      "1n",
      "1n.",
      "16t",
      "8t",
      "4t",
      "2t",
    ],
    ["8n."],
  ]);
  expect(result).toEqual([
    ["16n"],
    ["8n"],
    ["8n."],
    ["4n"],
    [
      "16n",
      "8n",
      "8n.",
      "4n",
      "4n.",
      "2n",
      "2n.",
      "1n",
      "1n.",
      "16t",
      "8t",
      "4t",
      "2t",
    ],
  ]);
});

describe("addDurationObjects combines duration object with duration array", () => {
  expect(addDurationObjects({ "4n": 2 }, ["4n", "8n"])).toEqual({
    "4n": 3,
    "8n": 1,
  });
});
