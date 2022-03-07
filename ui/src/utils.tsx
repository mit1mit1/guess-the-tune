import { Duration, DurationObject, Note } from "src/types";
import * as Tone from "tone";
import Vex from "vexflow";

export const playNotes = (guesses: Array<Note>, bpm: number) => {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.cancel();
  const synth = new Tone.Synth().toDestination();
  let current16s = 0;
  guesses.forEach((guessNote) => {
    console.log(
      "Playing guess",
      guessNote.pitch,
      guessNote.duration,
      intToDurationObject(current16s)
    );
    Tone.Transport.schedule(() => {
      synth.triggerAttackRelease(guessNote.pitch, guessNote.duration);
    }, "0:0:" + current16s);
    current16s += durationToInt(guessNote.duration);
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

const finishGuessLine = (
  durationCount: number,
  guessLine: string,
  pitch: string,
  postCat: string = ""
) => {
  if (durationCount <= 12) {
    while (durationCount <= 12) {
      if (guessLine.length > 0) {
        guessLine = guessLine.concat(", ");
      }
      guessLine = guessLine.concat(pitch + "/q" + postCat);
      durationCount = durationCount + 4;
    }
  }
  if (durationCount <= 14) {
    while (durationCount <= 14) {
      if (guessLine.length > 0) {
        guessLine = guessLine.concat(", ");
      }
      guessLine = guessLine.concat(pitch + "/8" + postCat);
      durationCount = durationCount + 2;
    }
  }
  if (durationCount % 16 != 0) {
    while (durationCount % 16 > 0) {
      if (guessLine.length > 0) {
        guessLine = guessLine.concat(", ");
      }
      guessLine = guessLine.concat(pitch + "/16" + postCat);
      durationCount++;
    }
  }
  return guessLine;
};

const finishGuessLineWithRests = (durationCount: number, guessLine: string) => {
  return finishGuessLine(durationCount, guessLine, "C5", "/r");
};

const pushGuess = (guessLine: string, pitch: string, duration: Duration) => {
  if (guessLine.length > 0) {
    guessLine = guessLine.concat(", ");
  }
  return guessLine.concat(pitch + getDivisionSymbol(duration));
};

export const renderSheetMusic = (guesses: Array<Note>) => {
  const VF = Vex.Flow;
  const staff = document.getElementById("boo");
  while (staff && staff.hasChildNodes()) {
    staff.lastChild && staff.removeChild(staff.lastChild);
  }

  const vf = new VF.Factory({
    renderer: { elementId: "boo", width: 500, height: 400 },
  });

  const score = vf.EasyScore();
  const system = vf.System();

  const guessLines: Array<string> = [];

  let guessLine = "";
  let durationCount = 0;

  guesses.forEach((guess, index) => {
    if (durationCount + durationToInt(guess.duration) > 16) {
      console.log(
        "pushing since duration is ",
        durationCount + durationToInt(guess.duration)
      );
      guessLines.push(finishGuessLine(durationCount, guessLine, guess.pitch));
      guessLine = "";
      durationCount = 0;
      guess.duration = intToDuration(
        durationToInt(guess.duration) - (16 - durationCount)
      );
    }
    guessLine = pushGuess(guessLine, guess.pitch, guess.duration);
    if (guessLine.length > 0) {
      guessLine = guessLine.concat(", ");
    }
    guessLine = guessLine.concat(
      guess.pitch + getDivisionSymbol(guess.duration)
    );
    durationCount += durationToInt(guess.duration);
  });
  guessLines.push(finishGuessLineWithRests(durationCount, guessLine));

  console.log(guessLines);
  guessLines.forEach((guessLine) => {
    system
      .addStave({
        voices: [score.voice(score.notes(guessLine, { stem: "up" }), {})],
      })
      .addClef("treble")
      .addTimeSignature("4/4");
  });

  vf.draw();
};
