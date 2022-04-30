import { Note } from "src/types";
import * as Tone from "tone";
import { durationObjectTo16thInt } from "./game";


export const playNotes = (notes: Array<Note>, bpm: number) => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.cancel();
  const synth = new Tone.Synth().toDestination();
  let current16s = 0;
  for (const note of notes) {
    if (!note.rest) {
      Tone.Transport.schedule(() => {
        let attackDuration = note.staccato ? "32n" : note.durationObject;
        synth.triggerAttackRelease(note.pitch, attackDuration);
      }, "0:0:" + current16s);
    }
    current16s += durationObjectTo16thInt(note.durationObject);
  };
  Tone.Transport.position = 0;
  Tone.Transport.start();
};
