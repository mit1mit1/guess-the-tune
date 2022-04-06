import { useEffect, useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { SVGScore } from "src/components/SVGScore";
import { Note, Duration, AnswerStatus, NoteStatus, Pitch } from "src/types";
import {
  playNotes,
  nextPitch,
  previousPitch,
  previousDuration,
  nextDuration,
} from "./utils";
import { gameSongs } from "src/songs";

const chosenSong = gameSongs[1];

const getNewAnswerStatus = <T extends Pitch | Duration>(
  oldStatus: AnswerStatus,
  correctAnswer: T,
  newAnswer: T
) => {
  if (oldStatus === AnswerStatus.GUESSEDCORRECT) {
    return oldStatus;
  }
  return correctAnswer === newAnswer
    ? AnswerStatus.GUESSEDCORRECT
    : AnswerStatus.INCORRECTSOFAR;
};

const pushIfNotIdentical = (
  oldArrayOfArrays: Array<Array<any>>,
  index: number,
  newItem: any
) => {
  const newArray = [...oldArrayOfArrays];
  if (oldArrayOfArrays[index].indexOf(newItem) === -1) {
    newArray[index].push(newItem);
  }
  return newArray;
};

const App = () => {
  const initialGuesses: Array<Note> = chosenSong.notes.map(() => ({
    pitch: "C4",
    duration: "4n",
  }));
  const [selectedNote, setSelectedNote] = useState(0);
  const [guesses, setGuesses] = useState(initialGuesses);
  const initialAnswerStatuses: Array<NoteStatus> = chosenSong.notes.map(() => ({
    pitchStatus: AnswerStatus.UNKNOWN,
    durationStatus: AnswerStatus.UNKNOWN,
  }));
  const [answerStatuses, setAnswerStatuses] = useState(initialAnswerStatuses);
  const [incorrectPitchesArray, setIncorrectPitchesArray] = useState(
    chosenSong.notes.map(() => []) as Array<Array<Pitch>>
  );
  const [incorrectDurationsArray, setIncorrectDurationsArray] = useState(
    chosenSong.notes.map(() => []) as Array<Array<Duration>>
  );
  const [pitchesGuessed, setPitchesGuessed] = useState(new Set<Pitch>([]));
  const [durationsGuessed, setDurationsGuessed] = useState(
    new Set<Duration>([])
  );
  const [wrongSpotPitches, setWrongSpotPitches] = useState(new Set<Pitch>([]));
  const [wrongSpotDurations, setWrongSpotDurations] = useState(
    new Set<Duration>([])
  );

  const checkGuesses = () => {
    let anyIncorrect = false;
    const newStatuses = chosenSong.notes.map((note, index) => {
      setPitchesGuessed(new Set(pitchesGuessed.add(guesses[index].pitch)));
      setDurationsGuessed(
        new Set(durationsGuessed.add(guesses[index].duration))
      );
      if (note.pitch !== guesses[index].pitch) {
        anyIncorrect = true;
        setIncorrectPitchesArray([
          ...pushIfNotIdentical(
            incorrectPitchesArray,
            index,
            guesses[index].pitch
          ),
        ]);
      }
      if (note.duration !== guesses[index].duration) {
        anyIncorrect = true;
        setIncorrectDurationsArray([
          ...pushIfNotIdentical(
            incorrectDurationsArray,
            index,
            guesses[index].duration
          ),
        ]);
      }
      return {
        pitchStatus: getNewAnswerStatus(
          answerStatuses[index].pitchStatus,
          note.pitch,
          guesses[index].pitch
        ),
        durationStatus: getNewAnswerStatus(
          answerStatuses[index].durationStatus,
          note.duration,
          guesses[index].duration
        ),
      } as NoteStatus;
    });
    setAnswerStatuses(newStatuses);
    const newWrongSpotPitches = new Set<Pitch>([]);
    const newWrongSpotDurations = new Set<Duration>([]);
    chosenSong.notes.forEach((note, index) => {
      if (
        answerStatuses[index].pitchStatus !== AnswerStatus.GUESSEDCORRECT &&
        pitchesGuessed.has(note.pitch)
      ) {
        newWrongSpotPitches.add(note.pitch);
      }
      if (
        answerStatuses[index].durationStatus !== AnswerStatus.GUESSEDCORRECT &&
        durationsGuessed.has(note.duration)
      ) {
        newWrongSpotDurations.add(note.duration);
      }
    });
    setWrongSpotPitches(new Set(newWrongSpotPitches));
    setWrongSpotDurations(new Set(newWrongSpotDurations));
    if (anyIncorrect === false) {
      alert("All right!");
    }
    playNotes([...guesses], chosenSong.bpm);
  };

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "w") {
        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses];
          const newPitch = nextPitch(prevGuesses[selectedNote].pitch);
          const newNote = { ...newGuesses[selectedNote], pitch: newPitch };
          newGuesses[selectedNote] = newNote;
          return newGuesses;
        });
      }
      if (key === "a") {
        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses];
          const newDuration = previousDuration(
            prevGuesses[selectedNote].duration
          );
          const newNote = {
            ...newGuesses[selectedNote],
            duration: newDuration,
          };
          newGuesses[selectedNote] = newNote;
          return newGuesses;
        });
      }
      if (key === "s") {
        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses];
          const newPitch = previousPitch(prevGuesses[selectedNote].pitch);
          const newNote = { ...newGuesses[selectedNote], pitch: newPitch };
          newGuesses[selectedNote] = newNote;
          return newGuesses;
        });
      }
      if (key === "d") {
        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses];
          const newDuration = nextDuration(prevGuesses[selectedNote].duration);
          const newNote = {
            ...newGuesses[selectedNote],
            duration: newDuration,
          };
          newGuesses[selectedNote] = newNote;
          return newGuesses;
        });
      }
      if (key === "ArrowRight") {
        if (selectedNote < chosenSong.notes.length - 1) {
          setSelectedNote((selectedNote) => selectedNote + 1);
        }
      }
      if (key === "ArrowLeft") {
        if (selectedNote > 0) {
          setSelectedNote((selectedNote) => selectedNote - 1);
        }
      }
    };
    document.addEventListener("keyup", handleKeyup, true);
    return () => {
      document.removeEventListener("keyup", handleKeyup, true);
    };
  }, [selectedNote]);

  return (
    <div className="App">
      <header>
        <Container maxWidth="lg">
          <h1>Musicle!</h1>
        </Container>
      </header>

      <main>
        <div>Selected note: {selectedNote + 1}</div>
        <SVGScore
          guessedNotes={[...guesses]}
          answerStatuses={answerStatuses}
          answerNotes={chosenSong.notes}
          incorrectPitches={incorrectPitchesArray}
          incorrectDurations={incorrectDurationsArray}
          setSelectedNote={setSelectedNote}
          wrongSpotPitches={wrongSpotPitches}
          wrongSpotDurations={wrongSpotDurations}
        />
        <div>Try to guess the riff.</div>
        <div>{chosenSong.bpm}bpm</div>
        <div>
          Correct Pitches in Unknown Position:{" "}
          {Array.from(wrongSpotPitches).join(", ")}
        </div>
        <div>
          Correct Durations in Unknown Position:{" "}
          {Array.from(wrongSpotDurations).join(", ")}
        </div>
        <button onClick={checkGuesses}>Check Guesses</button>
      </main>
    </div>
  );
};

export default App;
