import {
  pushIfNotIdentical,
} from "./game";

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

