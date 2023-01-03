import { incrementPitch, unsharp } from "./pitch";

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

  it("picks closest element when incrementing and current pitch is unavailable", () => {
    const result = incrementPitch(
      [{ pitch: "A#5", durations: ["16n"], rest: true }],
      0,
      1,
      ["A#3", "A#4", "B5"]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "B5", durations: ["16n"], rest: true });
  });

  it("picks closest element when decrementing and current pitch is unavailable", () => {
    const result = incrementPitch(
      [{ pitch: "A#5", durations: ["16n"], rest: true }],
      0,
      -1,
      ["A#3", "A#4", "B5"]
    );
    expect(result.length).toBe(1);
    expect(result[0]).toEqual({ pitch: "B5", durations: ["16n"], rest: true });
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
