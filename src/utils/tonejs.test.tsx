import { Note } from "src/types";

const note: Note = {
  pitch: "A4",
  durationObject: {
    "16n": 2,
  },
};

test("renders app, title displays", async () => {
  for (const [duration, multiplier] of Object.entries(note.durationObject)) {
    console.log(duration, multiplier);
  }
});
