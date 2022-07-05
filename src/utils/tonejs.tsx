import { Note, ToneJSDuration } from "src/types";
import * as Tone from "tone";
import { addDurationObjects } from "./game";
import PianoMp3 from "tonejs-instrument-piano-mp3";

const instrument = new PianoMp3({
  minify: true,
}).toDestination("main");

export const playNotes = (notes: Array<Note>, bpm: number) => {
  if (notes.length > 1) {
    console.log(JSON.stringify(notes));
  }
  if (instrument.loaded) {
    Tone.start();
    Tone.Transport.cancel();
    instrument.releaseAll();
    instrument.sync();
    let currentTime: ToneJSDuration = { "16n": 0 };
    for (const note of notes) {
      if (!note.rest) {
        let attackDuration = note.staccato ? "32n" :  addDurationObjects({}, note.durations);
        instrument.triggerAttackRelease(
          note.pitch,
          attackDuration,
          currentTime
        );
      }
      currentTime = addDurationObjects(currentTime, note.durations);
    }
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.position = "0:0:0";
    Tone.Transport.start();
  }
};
