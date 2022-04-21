import { BaseDuration, Note } from "src/types";
import * as Tone from "tone";

const durationToInt = (duration: BaseDuration) => {
  switch (duration) {
    case "16n":
      return 1;
    case "8n":
      return 2;
    case "8n.":
      return 3;
    case "4n":
      return 4;
    case "4n.":
      return 6;
    case "2n":
      return 8;
    case "2n.":
      return 12;
    case "1n":
      return 16;
    case "1n.":
      return 24;
  }
};

export const playNotes = (notes: Array<Note>, bpm: number) => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.cancel();
  const synth = new Tone.Synth().toDestination();
  let current16s = 0;
  notes.forEach((note) => {
    Tone.Transport.schedule(() => {
      synth.triggerAttackRelease(note.pitch, note.durationObject);
    }, "0:0:" + current16s);
    for (const [duration, multiplier] of Object.entries(note.durationObject)) {
      current16s += multiplier * durationToInt(duration as BaseDuration);
    }
  });
  Tone.Transport.position = 0;
  Tone.Transport.start();
};
