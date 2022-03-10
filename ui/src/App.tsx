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

const getNewStatus = (oldStatus: AnswerStatus, oldAnswer: any, newAnswer: any) => {
  if (oldStatus === AnswerStatus.CORRECT) {
    console.log("Returning Correct")
    return oldStatus;
  }
  return oldAnswer === newAnswer ? AnswerStatus.CORRECT : AnswerStatus.INCORRECT;
}

const pushIfNotIdentical = (oldArrayOfArrays: Array<Array<any>>, index: number, newItem: any) => {
  const newArray = [...oldArrayOfArrays];
  if (oldArrayOfArrays[index].indexOf(newItem) === -1) {
    newArray[index].push(newItem);
  }
  console.log("returning ", newArray);
  return newArray;
}

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
  const [pitchesCorrectSomewhereNotGuessedYet, setPitchesCorrectSomewhereNotGuessedYet] = useState([] as Array<string>);
  const [durationsCorrectSomewhereNotGuessedYet, setDurationsCorrectSomewhereNotGuessedYet] = useState([] as Array<Duration>);

  const checkGuesses = () => {
    console.log("guesses are ", guesses);
    let anyIncorrect = false;
    const newStatuses = simpsonsAnswer.map((note, index) => {
      if (note.pitch !== guesses[index].pitch) {
        anyIncorrect = true;
        setIncorrectPitchesArray(pushIfNotIdentical(incorrectPitchesArray, index, guesses[index].pitch));
      }
      if (note.duration !== guesses[index].duration) {
        anyIncorrect = true;
        setIncorrectDurationsArray(pushIfNotIdentical(incorrectDurationsArray, index, guesses[index].duration));
      }
      return {
        pitchStatus: getNewStatus(answerStatuses[index].pitchStatus, note.pitch, guesses[index].pitch),
        durationStatus: getNewStatus(answerStatuses[index].pitchStatus, note.pitch, guesses[index].pitch),
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
