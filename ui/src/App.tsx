import { useState } from "react";  
import "./App.css";
import Container from "@mui/material/Container";
import { GuessInput } from "src/components/GuessInput";
import {
  Note,
  Duration,
  AnswerStatus,
  NoteStatus,
} from "src/types";
import { playNotes, renderSheetMusic } from "./utils";
import { gameSongs } from 'src/songs';

const chosenSong = gameSongs[2]


const playChosenSong = () => {
  playNotes(chosenSong.notes, chosenSong.bpm);
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
  const initialGuesses: Array<Note> = chosenSong.notes.map(() => ({
    pitch: "C4",
    duration: "4n",
  }));
  const [guesses, setGuesses] = useState(initialGuesses);
  const initialAnswerStatuses: Array<NoteStatus> = chosenSong.notes.map(() => ({
    pitchStatus: AnswerStatus.UNKNOWN,
    durationStatus: AnswerStatus.UNKNOWN,
  }));
  const [answerStatuses, setAnswerStatuses] = useState(initialAnswerStatuses);
  const [incorrectPitchesArray, setIncorrectPitchesArray] = useState(
    chosenSong.notes.map(() => []) as Array<Array<string>>
  );
  const [incorrectDurationsArray, setIncorrectDurationsArray] = useState(
    chosenSong.notes.map(() => []) as Array<Array<Duration>>
  );
  const [pitchesCorrectSomewhereNotGuessedYet, setPitchesCorrectSomewhereNotGuessedYet] = useState([] as Array<string>);
  const [durationsCorrectSomewhereNotGuessedYet, setDurationsCorrectSomewhereNotGuessedYet] = useState([] as Array<Duration>);

  const checkGuesses = () => {
    let anyIncorrect = false;
    const newStatuses = chosenSong.notes.map((note, index) => {
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
    playNotes(guesses, chosenSong.bpm);

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
        <div>{chosenSong.bpm}bpm</div>
        <div id="boo"></div>
        {chosenSong.notes.map((answer, index) => (
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
        <button onClick={playChosenSong}>Spoil Answer</button>
      </main>
    </div>
  );
};

export default App;
