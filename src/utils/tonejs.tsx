import { Duration, Note } from "src/types";
import * as Tone from "tone";
import { addDurationObjects } from "./game";
import PianoMp3 from 'tonejs-instrument-piano-mp3';


const
  instrument = new PianoMp3({
    minify: true,
  }).toDestination('main');

export const playNotes = (notes: Array<Note>, bpm: number) => {
  if (instrument.loaded) {
    Tone.start();
    Tone.Transport.cancel(-1);
    instrument.releaseAll();
    instrument.sync();
    let currentTime: Duration = {"16n": 0};
    for (const note of notes) {
      if (!note.rest) {
        let attackDuration = note.staccato ? "32n" : note.durationObject;
        instrument.triggerAttackRelease(note.pitch, attackDuration, currentTime);
      }
      currentTime = addDurationObjects(currentTime, note.durationObject);
    }
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.position = "0:0:0"
    Tone.Transport.start();
  }
};
