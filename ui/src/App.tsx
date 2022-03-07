import React, { useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { GuessInput } from "src/components/GuessInput";
import {
  Note,
  Duration,
  AnswerStatus,
  DurationObject,
  NoteStatus,
} from "src/types";
import { durationToInt, playNotes, renderSheetMusic } from "./utils";

const simpsonsBPM = 172;

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

const playSimpsonsRiff = () => {
  playNotes(simpsonsAnswer, simpsonsBPM);
};

const App = () => {
  const initialGuesses: Array<Note> = simpsonsAnswer.map(() => ({
    pitch: "C4",
    duration: "4n",
  }));
  const [guesses, setGuesses] = useState(initialGuesses);
  const initialAnswerStatuses: Array<NoteStatus> = simpsonsAnswer.map(() => ({
    pitchStatus: AnswerStatus.UNKNOWN,
    durationStatus: AnswerStatus.UNKNOWN,
  }));
  const [answerStatuses, setAnswerStatuses] = useState(initialAnswerStatuses);
  const [incorrectPitchesArray, setIncorrectPitchesArray] = useState(
    simpsonsAnswer.map(() => []) as Array<Array<string>>
  );
  const [incorrectDurationsArray, setIncorrectDurationsArray] = useState(
    simpsonsAnswer.map(() => []) as Array<Array<Duration>>
  );

  const checkGuesses = () => {
    console.log("guesses are ", guesses);
    let anyIncorrect = false;
    const newStatuses = simpsonsAnswer.map((note, index) => {
      if (note.pitch !== guesses[index].pitch) {
        anyIncorrect = true;
        const newIncorrectPitchesArray = [...incorrectPitchesArray];
        newIncorrectPitchesArray[index].push(guesses[index].pitch);
        setIncorrectPitchesArray(newIncorrectPitchesArray);
      }
      if (note.duration !== guesses[index].duration) {
        anyIncorrect = true;
        const newIncorrectDurationsArray = [...incorrectDurationsArray];
        newIncorrectDurationsArray[index].push(guesses[index].duration);
        setIncorrectDurationsArray(newIncorrectDurationsArray);
      }
      let newPitchStatus = answerStatuses[index].pitchStatus;
      if (newPitchStatus != AnswerStatus.CORRECT) {
        newPitchStatus =
          note.pitch === guesses[index].pitch
            ? AnswerStatus.CORRECT
            : AnswerStatus.INCORRECT;
      }
      let newDurationStatus = answerStatuses[index].durationStatus;
      if (answerStatuses[index].durationStatus != AnswerStatus.CORRECT) {
        newDurationStatus =
          note.duration === guesses[index].duration
            ? AnswerStatus.CORRECT
            : AnswerStatus.INCORRECT;
      }
      return {
        pitchStatus: newPitchStatus,
        durationStatus: newDurationStatus,
      } as NoteStatus;
    });
    setAnswerStatuses(newStatuses);
    if (anyIncorrect === false) {
      alert("All right!");
    }
    playNotes(guesses, simpsonsBPM);

    // renderSheetMusic(guesses);
  };

  const assignIndexedGuess = (index: number, note: Note) => {
    let newGuesses = guesses;
    newGuesses[index] = note;
    setGuesses(newGuesses);
  };

  return (
    <div className="App">
      <header>
        <Container maxWidth="lg">
          <h1>Musicle!</h1>
        </Container>
      </header>

      <main>
        <div>Try to guess the riff.</div>
        <div id="boo"></div>
        {simpsonsAnswer.map((answer, index) => (
          <GuessInput
            answer={answer}
            index={index}
            answerNoteStatus={answerStatuses[index]}
            guess={initialGuesses[index]}
            setGuess={(note) => assignIndexedGuess(index, note)}
            incorrectPitches={incorrectPitchesArray[index]}
            incorrectDurations={incorrectDurationsArray[index]}
          />
        ))}
        <button onClick={checkGuesses}>Check Guesses</button>
      </main>
    </div>
  );
};

export default App;
