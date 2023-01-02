import { incrementDuration } from "./duration";

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
    expect(result[0]).toEqual({ pitch: "A#3", durations: ["8n", "1n"], rest: true });
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
});
