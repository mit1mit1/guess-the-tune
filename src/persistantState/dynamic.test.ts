import { LocalStorageMock } from "src/mocks";
import {
  getLastCorrectIndex,
  getTimePlayed,
  getTodaysTurns,
  setTodaysTime,
  setTodaysTurns,
} from "./dynamic";

describe("local storage state", () => {
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
  });

  it("getLastCorrectIndex pulls straight from localStorage", () => {
    localStorage.setItem("lastCorrectIndex", "12");
    expect(getLastCorrectIndex()).toEqual("12");
  });

  it("setTodaysTurns sets a value that can be gotten from getTodaysTurns when isLatestTune", () => {
    setTodaysTurns(123);
    expect(getTodaysTurns()).toEqual("123");
  });

  it("setTodaysTime sets a value that can be gotten from getTimePlayed when isLatestTune", () => {
    setTodaysTime();
    expect(Number(getTimePlayed())).toBeGreaterThanOrEqual(0);
  });
});
