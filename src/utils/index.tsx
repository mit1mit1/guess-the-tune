import { Duration, DurationObject, Note, Pitch } from "src/types";
import * as Tone from "tone";
import { durationNames, pitchNames } from "src/constants";
export * from "./score";

export const nextPitch = (pitch: Pitch) => {
  const index = pitchNames.indexOf(pitch);
  if (index >= 0 && index < pitchNames.length - 1) {
    return pitchNames[index + 1];
  }
  return pitchNames[0];
};

export const previousPitch = (pitch: Pitch) => {
  const index = pitchNames.indexOf(pitch);
  if (index >= 1) {
    return pitchNames[index - 1];
  }
  return pitchNames[pitchNames.length - 1];
};

export const nextDuration = (duration: Duration) => {
  const index = durationNames.indexOf(duration);
  if (index >= 0 && index < durationNames.length - 1) {
    return durationNames[index + 1];
  }
  return durationNames[0];
};

export const previousDuration = (duration: Duration) => {
  const index = durationNames.indexOf(duration);
  if (index >= 1) {
    return durationNames[index - 1];
  }
  return durationNames[durationNames.length - 1];
};
export const playNotes = (notes: Array<Note>, bpm: number) => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.cancel();
  const synth = new Tone.Synth().toDestination();
  let current16s = 0;
  notes.forEach((note) => {
    Tone.Transport.schedule(() => {
      synth.triggerAttackRelease(note.pitch, note.duration);
    }, "0:0:" + current16s);
    current16s += durationToInt(note.duration);
  });
  Tone.Transport.position = 0;
  Tone.Transport.start();
};

export const durationToInt = (duration: Duration) => {
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

export const durationObjectToInt = (durationObject: DurationObject) => {
  let result = 0;
  result += 2 * durationObject["8n"];
  result += 3 * durationObject["8n."];
  result += 4 * durationObject["4n"];
  result += 6 * durationObject["4n."];
  result += 8 * durationObject["2n"];
  result += 12 * durationObject["2n."];
  result += 16 * durationObject["1n"];
  result += 24 * durationObject["1n."];
  return result;
};

export const intToDuration = (countOf16s: number) => {
  switch (countOf16s) {
    case 1:
      return "16n";
    case 2:
      return "8n";
    case 4:
      return "4n";
    case 8:
      return "2n";
    default:
      return "1n";
  }
};

export const intToDurationObject = (countOf16s: number) => {
  return {
    "16n": countOf16s,
  };
};

export const getDivisionSymbol = (duration: Duration) => {
  switch (duration) {
    case "16n":
      return "/16";
    case "8n":
      return "/8";
    case "8n.":
      return "/8.";
    case "4n":
      return "/q";
    case "4n.":
      return "/q.";
    case "2n":
      return "/h";
    case "2n.":
      return "/h.";
    case "1n":
      return "/w";
    case "1n.":
      return "/w.";
  }
};
