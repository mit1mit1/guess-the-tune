import { useEffect } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { SVGScore } from "src/components/SVGScore";
import { playNotes, allCorrect } from "./utils";
import { gameSongs } from "src/songs";
import { useStore } from "src/guessStore";

const chosenSong = gameSongs[1];

const App = () => {
  const {
    selectedNote,
    setSelectedNote,
    incrementGuessPitch,
    incrementGuessDuration,
    guesses,
    checkGuesses,
    answerStatuses,
    incorrectPitchesArray,
    incorrectDurationsArray,
    wrongSpotPitches,
    wrongSpotDurations,
  } = useStore((state) => state);

  const handleCheckGuess = () => {
    checkGuesses();
    if (allCorrect(guesses, chosenSong.notes)) {
      alert("All right!");
    }
    playNotes([...guesses], chosenSong.bpm);
  };

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "w") {
        incrementGuessPitch(selectedNote, 1);
      }
      if (key === "a") {
        incrementGuessDuration(selectedNote, -1);
      }
      if (key === "s") {
        incrementGuessPitch(selectedNote, -1);
      }
      if (key === "d") {
        incrementGuessPitch(selectedNote, -1);
      }
      if (key === "ArrowRight") {
        if (selectedNote < chosenSong.notes.length - 1) {
          setSelectedNote(selectedNote + 1);
        }
      }
      if (key === "ArrowLeft") {
        if (selectedNote > 0) {
          setSelectedNote(selectedNote - 1);
        }
      }
    };
    document.addEventListener("keyup", handleKeyup, true);
    return () => {
      document.removeEventListener("keyup", handleKeyup, true);
    };
  }, [
    incrementGuessDuration,
    incrementGuessPitch,
    selectedNote,
    setSelectedNote,
  ]);

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
          answerStatuses={answerStatuses}
          answerNotes={chosenSong.notes}
          incorrectPitches={incorrectPitchesArray}
          incorrectDurations={incorrectDurationsArray}
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
        <button onClick={handleCheckGuess}>Check Guesses</button>
      </main>
    </div>
  );
};

export default App;
