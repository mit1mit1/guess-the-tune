import { useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import { SVGScore } from "src/components/SVGScore";
import { playNotes, allCorrect } from "./utils";
import { gameSongs } from "src/songs";
import { useStore } from "src/guessStore";
import "./App.css";

const chosenSong = gameSongs[1];

const App = () => {
  const {
    selectedNoteIndex,
    setSelectedNoteIndex,
    incrementGuessPitch,
    incrementGuessDuration,
    guesses,
    checkGuesses,
  } = useStore((state) => state);

  const handleCheckGuess = useCallback(() => {
    checkGuesses();
    if (allCorrect(guesses, chosenSong.notes)) {
      alert("All right!");
    }
    playNotes([...guesses], chosenSong.bpm);
  }, [checkGuesses, guesses]);

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
        incrementGuessDuration(selectedNoteIndex, -1);
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
      if (key === "Enter") {
        handleCheckGuess();
      }
    };
    document.addEventListener("keyup", handleKeyup, true);
    return () => {
      document.removeEventListener("keyup", handleKeyup, true);
    };
  }, [handleCheckGuess, incrementGuessDuration, incrementGuessPitch, selectedNoteIndex, setSelectedNoteIndex]);

  return (
    <div className="App">
      <header>
        <Container maxWidth="lg">
          <h1>Musicle!</h1>
        </Container>
      </header>

      <main>
        <SVGScore correctNotes={chosenSong.notes} />
        <div>Try to guess the riff.</div>
        <div>{chosenSong.bpm}bpm</div>
        <button onClick={handleCheckGuess}>Check Guesses</button>
      </main>
    </div>
  );
};

export default App;
