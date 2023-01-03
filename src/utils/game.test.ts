import { getNextUnguessedIndex } from "./game";

describe("getNextUnguessedIndex", () => {
  it("returns a valid array index", () => {
    const result = getNextUnguessedIndex();
    expect(result).toBeGreaterThan(-1);
  });
});
