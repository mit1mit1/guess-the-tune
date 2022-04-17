import { useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import { SVGScore } from "src/components/SVGScore";
import { playNotes, allCorrect } from "./utils";
import { useStore } from "src/guessStore";
import "./App.css";
import { DurationKeyboard } from "./components/DurationKeyboard";
import { BACKGROUND_COLOR } from "./constants";
import { PitchKeyboard } from "./components/PitchKeyboard";
import { gameSongs } from "./songs";


const App = () => {
  const {
    selectedNoteIndex,
    setSelectedNoteIndex,
    incrementGuessPitch,
    incrementGuessDuration,
    guesses,
    checkGuesses,
    chosenSongIndex,
  } = useStore((state) => state);
  const chosenSong = gameSongs[chosenSongIndex];

  const handleCheckGuess = useCallback(() => {
    checkGuesses();
    if (allCorrect(guesses, chosenSong.notes)) {
      alert("All right!");
    }
    playNotes([...guesses], chosenSong.bpm);
  }, [checkGuesses, chosenSong.bpm, chosenSong.notes, guesses]);

  useEffect(() => {
    const handleKeyup = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "w") {
        incrementGuessPitch(selectedNoteIndex, 1);
      }
      if (key === "a") {
        incrementGuessDuration(selectedNoteIndex, -1);
      }
      if (key === "s") {
        incrementGuessPitch(selectedNoteIndex, -1);
      }
      if (key === "d") {
        incrementGuessDuration(selectedNoteIndex, 1);
      }
      if (key === "ArrowRight") {
        if (selectedNoteIndex < chosenSong.notes.length - 1) {
          setSelectedNoteIndex(selectedNoteIndex + 1);
        }
      }
      if (key === "ArrowLeft") {
        if (selectedNoteIndex > 0) {
          setSelectedNoteIndex(selectedNoteIndex - 1);
        }
      }
      if (key === "Enter" || key === "Spacebar" || key === " ") {
        handleCheckGuess();
      }
    };
    document.addEventListener("keyup", handleKeyup, true);
    return () => {
      document.removeEventListener("keyup", handleKeyup, true);
    };
  }, [chosenSong.notes.length, handleCheckGuess, incrementGuessDuration, incrementGuessPitch, selectedNoteIndex, setSelectedNoteIndex]);

  return (
    <div className="App" style={{ backgroundColor: BACKGROUND_COLOR }}>
      <header>
        <Container maxWidth="lg">
          <h1>Musicle!</h1>
          <div>Try to guess the riff.</div>
          <div>{chosenSong.bpm}bpm</div>
        </Container>
      </header>

      <main>
        <SVGScore correctNotes={chosenSong.notes} />
        <Container>
          <PitchKeyboard />
          <DurationKeyboard />
        </Container>
        <div>Use Left and Right Arrows to select a note (or click on it).</div>
        <div>Use 'W' and 'S' to increase or decrease the pitch of the selected note.</div>
        <div>Use 'A' and 'D' to increase or decrease the duration of the selected note.</div>
        <button onClick={handleCheckGuess}>Check Guesses</button>
      </main>
    </div>
  );
};

export default App;
