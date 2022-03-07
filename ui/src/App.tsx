import React, { useState } from "react";
import "./App.css";
import * as Tone from "tone";
import Container from "@mui/material/Container";
import { GuessInput } from "src/components/GuessInput";
import { Note, Duration, AnswerStatus } from "src/types";

const simpsonsBPM = 172;

const playSimpsonsRiff = () => {
  Tone.Transport.bpm.value = simpsonsBPM;
  const synth = new Tone.Synth().toDestination();
  Tone.Transport.cancel();
  Tone.Transport.schedule((time) => {
    synth.triggerAttackRelease("C4", "4n.");
  }, "0:0:0");
  Tone.Transport.schedule((time) => {
    synth.triggerAttackRelease("E4", "4n");
  }, "0:0:6");
  Tone.Transport.schedule((time) => {
    synth.triggerAttackRelease("F#4", "4n");
  }, "0:0:10");
  Tone.Transport.schedule((time) => {
    synth.triggerAttackRelease("A4", "8n");
  }, "0:0:14");
  Tone.Transport.schedule((time) => {
    synth.triggerAttackRelease("G4", "4n.");
  }, "0:0:16");
  Tone.Transport.schedule((time) => {
    synth.triggerAttackRelease("E4", "4n");
  }, "0:0:22");
  Tone.Transport.schedule((time) => {
    synth.triggerAttackRelease("C4", "4n");
  }, "0:0:26");
  Tone.Transport.schedule((time) => {
    synth.triggerAttackRelease("A3", "8n");
  }, "0:0:30");
  Tone.Transport.position = 0;
  Tone.Transport.start();
};

const simpsonsAnswer: Array<Note> = [
  { pitch: "C4", duration: "4n." },
  { pitch: "E4", duration: "4n" },
  { pitch: "F#4", duration: "4n" },
  { pitch: "A4", duration: "8n" },
  { pitch: "G4", duration: "4n." },
  { pitch: "E4", duration: "4n" },
  { pitch: "C4", duration: "4n" },
  { pitch: "A3", duration: "8n" },
];

interface DurationObject {
  "16n": 0;
  "8n": 0;
  "8n.": 0;
  "4n": 0;
  "4n.": 0;
  "2n": 0;
  "2n.": 0;
  "1n": 0;
  "1n.": 0;
}

const durationToInt = (duration: Duration) => {
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

const durationObjectToInt = (durationObject: DurationObject) => {
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

const intToDurationObject = (countOf16s: number) => {
  return {
    "16n": countOf16s,
  };
};

const playNotes = (guesses: Array<Note>) => {
  Tone.Transport.bpm.value = simpsonsBPM;
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
    Tone.Transport.schedule((time) => {
      synth.triggerAttackRelease(guessNote.pitch, guessNote.duration);
    }, "0:0:" + current16s);
    current16s += durationToInt(guessNote.duration);
  });
  Tone.Transport.position = 0;
  Tone.Transport.start();
};

const App = () => {
  const initialGuesses: Array<Note> = [
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
    { pitch: "C4", duration: "4n" },
  ];
  const [guesses, setGuesses] = useState(initialGuesses);
  const initialAnswerStatuses: Array<{
    pitchStatus: AnswerStatus;
    durationStatus: AnswerStatus;
  }> = [
    { pitchStatus: AnswerStatus.UNKNOWN, durationStatus: AnswerStatus.UNKNOWN },
    { pitchStatus: AnswerStatus.UNKNOWN, durationStatus: AnswerStatus.UNKNOWN },
    { pitchStatus: AnswerStatus.UNKNOWN, durationStatus: AnswerStatus.UNKNOWN },
    { pitchStatus: AnswerStatus.UNKNOWN, durationStatus: AnswerStatus.UNKNOWN },
    { pitchStatus: AnswerStatus.UNKNOWN, durationStatus: AnswerStatus.UNKNOWN },
    { pitchStatus: AnswerStatus.UNKNOWN, durationStatus: AnswerStatus.UNKNOWN },
    { pitchStatus: AnswerStatus.UNKNOWN, durationStatus: AnswerStatus.UNKNOWN },
    { pitchStatus: AnswerStatus.UNKNOWN, durationStatus: AnswerStatus.UNKNOWN },
  ];
  const [answerStatuses, setAnswerStatuses] = useState(initialAnswerStatuses);

  const startChecking = () => {
    console.log("guesses are ", guesses);
    let anyIncorrect = false;
    const newStatuses = simpsonsAnswer.map((note, index) => {
      if (
        note.pitch !== guesses[index].pitch ||
        note.duration !== guesses[index].duration
      ) {
        anyIncorrect = true;
      }
      return {
        pitchStatus:
          note.pitch === guesses[index].pitch
            ? AnswerStatus.CORRECT
            : AnswerStatus.INCORRECT,
        durationStatus:
          note.duration === guesses[index].duration
            ? AnswerStatus.CORRECT
            : AnswerStatus.INCORRECT,
      };
    });
    setAnswerStatuses(newStatuses);
    if (anyIncorrect === false) {
      alert("All right!");
    }
    playNotes(guesses);
  };

  const assignIndexedGuess = (index: number, note: Note) => {
    let newGuesses = guesses;
    newGuesses[index] = note;
    setGuesses(newGuesses);
  };

  return (
    <div className="App">
      <header>
        <Container maxWidth="lg"><h1>Musicle!</h1></Container>
      </header>

      <main>
        <Container maxWidth="lg">
          <div>Try to guess the riff.</div>
          {simpsonsAnswer.map((answer, index) => (
            <GuessInput
              answer={answer}
              index={index}
              answerNoteStatus={answerStatuses[index]}
              setGuess={(note) => assignIndexedGuess(index, note)}
            />
          ))}
          <button onClick={playSimpsonsRiff}>Play Riff</button>
          <button onClick={startChecking}>Check Guesses</button>
        </Container>
      </main>
    </div>
  );
};

export default App;
