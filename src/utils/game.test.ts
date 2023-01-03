import { getNextUnguessedIndex, getScore } from "./game";

describe("getNextUnguessedIndex", () => {
  it("returns a valid array index", () => {
    const result = getNextUnguessedIndex();
    expect(result).toBeGreaterThan(-1);
  });
});

describe("getScore", () => {
  it("is greater when there are more notes", () => {
    expect(getScore("1", "1", 5)).toBeGreaterThan(getScore("1", "1", 3));
  });

  it("is smaller when there were more guesses", () => {
    expect(getScore("1", "4", 1)).toBeLessThan(getScore("1", "2", 1));
  });

  it("is smaller when it took more seconds", () => {
    expect(getScore("5", null, 1)).toBeLessThan(getScore("1", null, 1));
  });
});
