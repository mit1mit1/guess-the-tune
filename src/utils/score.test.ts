import {
  getBaseYPosition,
  numberOfNotePaths,
  shouldAddDurationDot,
  shouldAddSharp,
  shouldAddTripletSymbol,
} from "./score";

describe("shouldAddSharp", () => {
  it("returns true if pitch is sharp", () => {
    expect(shouldAddSharp("A#3")).toBeTruthy();
    expect(shouldAddSharp("D#4")).toBeTruthy();
    expect(shouldAddSharp("F#3")).toBeTruthy();
    expect(shouldAddSharp("G#5")).toBeTruthy();
  });

  it("returns false if pitch is natural", () => {
    expect(shouldAddSharp("A3")).toBeFalsy();
    expect(shouldAddSharp("D4")).toBeFalsy();
    expect(shouldAddSharp("F3")).toBeFalsy();
    expect(shouldAddSharp("G5")).toBeFalsy();
    expect(shouldAddSharp("B5")).toBeFalsy();
    expect(shouldAddSharp("E5")).toBeFalsy();
  });
});

describe("numberOfNotePaths", () => {
  it("returns number of distinct base durations", () => {
    expect(numberOfNotePaths([])).toBe(0);
    expect(numberOfNotePaths(["2n"])).toBe(1);
    expect(numberOfNotePaths(["2n", "1n"])).toBe(2);
  });
});

describe("getBaseYPosition", () => {
  it("returns same value for sharp as natural", () => {
    expect(getBaseYPosition("A#3")).toEqual(getBaseYPosition("A3"));
    expect(getBaseYPosition("A#4")).toEqual(getBaseYPosition("A4"));
    expect(getBaseYPosition("D#4")).toEqual(getBaseYPosition("D4"));
  });

  it("returns consistent distance between stave lines/spaces", () => {
    expect(getBaseYPosition("G4") - getBaseYPosition("E4")).toEqual(
      getBaseYPosition("B4") - getBaseYPosition("G4")
    );

    expect(getBaseYPosition("A4") - getBaseYPosition("F4")).toEqual(
      getBaseYPosition("C5") - getBaseYPosition("A4")
    );

    expect(getBaseYPosition("A#5") - getBaseYPosition("F#3")).toEqual(
      getBaseYPosition("B5") - getBaseYPosition("G3")
    );
  });
});

describe("shouldAddDurationDot", () => {
  it("returns true if duration is multiplied by 1.5", () => {
    expect(shouldAddDurationDot("2n.")).toBeTruthy();
    expect(shouldAddDurationDot("1n.")).toBeTruthy();
  });

  it("returns false if duration is unmodified", () => {
    expect(shouldAddDurationDot("1n")).toBeFalsy();
    expect(shouldAddDurationDot("2n")).toBeFalsy();
  });
});

describe("shouldAddTripletSymbol", () => {
  it("returns true if duration is a triplet of some kind", () => {
    expect(shouldAddTripletSymbol("2t")).toBeTruthy();
    expect(shouldAddTripletSymbol("4t")).toBeTruthy();
  });

  it("returns false if duration is unmodified", () => {
    expect(shouldAddTripletSymbol("1n")).toBeFalsy();
    expect(shouldAddTripletSymbol("2n")).toBeFalsy();
  });
});
