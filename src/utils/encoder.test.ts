import { Note, TimeSignature } from "src/types";
import { decodeSong, encodeSong, maxifySong, minifySong } from "./encoder";

describe("minifySong", () => {
  it("returns a song with shorter keys", () => {
    const result = minifySong({
      name: "test name",
      bpm: 123,
      timeSignature: TimeSignature.FIVEFOUR,
      notes: [{ pitch: "A#3", durations: ["16n"], rest: true }],
      readyForProduction: false,
    });
    expect(result.na).toBe("test name");
    expect(result.no).toEqual([{ p: "A#3", d: ["16n"], r: true, s: false }]);
    expect(result.b).toBe(123);
    expect(result.t).toBe(TimeSignature.FIVEFOUR);
    expect(result.r).toBe(false);
  });
});

describe("maxifySong", () => {
  it("reverses minify song with boolean casting", () => {
    const testNote = { pitch: "A#3", durations: ["16n"], rest: true };
    const testSong = {
      name: "test name",
      bpm: 123,
      timeSignature: TimeSignature.FIVEFOUR,
      notes: [testNote] as Note[],
      readyForProduction: false,
    };
    const result = maxifySong(minifySong(testSong));
    expect(result).toEqual({
      ...testSong,
      notes: [{ ...testNote, staccato: false }],
    });
  });
});

describe("encode and decode song", () => {
  it("reverses each other", () => {
    const testNote = { pitch: "A#3", durations: ["16n"], rest: true };
    const testSong = {
      name: "test name",
      bpm: 123,
      timeSignature: TimeSignature.FIVEFOUR,
      notes: [testNote] as Note[],
      readyForProduction: false,
    };
    const result = decodeSong(encodeSong(testSong));
    expect(result).toEqual({
      ...testSong,
      notes: [{ ...testNote, staccato: false }],
    });
  });
});
