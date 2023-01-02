import { Note, ToneJSDuration } from "src/types";
import * as Tone from "tone";
import { addDurationObjects } from "src/utils/duration";
import PianoMp3 from "tonejs-instrument-piano-mp3";

const instrument = new PianoMp3({
  minify: true,
}).toDestination("main");

export const playNotes = (notes: Array<Note>, bpm: number) => {
  if (instrument.loaded) {
    Tone.start();
    Tone.Transport.cancel();
    instrument.releaseAll();
    instrument.sync();
    let currentTime: ToneJSDuration = { "16n": 0 };
    for (const note of notes) {
      if (!note.rest) {
        let holdNoteLength: ToneJSDuration | string = addDurationObjects(
          {},
          note.durations
        );
        if (note.staccato) {
          if (
            note.durations.length === 1 &&
            (note.durations[0] === "16n" || note.durations[0] === "8n")
          ) {
            holdNoteLength = "32n";
          } else {
            holdNoteLength = "16n";
          }
        }
        let attackDuration = holdNoteLength;
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
