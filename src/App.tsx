import { useCallback, useEffect } from "react";
import { SVGScore } from "src/components/SVGScore";
import { allCorrect } from "./utils";
import { useStore } from "src/gameStore";
import "./App.css";
import { DurationKeyboard } from "./components/DurationKeyboard";
import { BACKGROUND_COLOR } from "./constants";
import { PitchKeyboard } from "./components/PitchKeyboard";
import { Note } from "./types";

const App = ({
  playNotes,
}: {
  playNotes: (guessArray: Array<Note>, bpm: number) => void;
}) => {
  const {
    selectedNoteIndex,
    setSelectedNoteIndex,
    incrementGuessPitch,
    incrementGuessDuration,
    incrementTurn,
    checkGuesses,
    guesses,
    turn,
    chosenSong,
  } = useStore();

  const handleCheckGuess = useCallback(() => {
    incrementTurn();
    checkGuesses();
    if (allCorrect(guesses, chosenSong.notes)) {
      alert("All right! Got it in " + turn + " turns :)");
    }
    playNotes([...guesses], chosenSong.bpm);
  }, [
    checkGuesses,
    chosenSong.bpm,
    chosenSong.notes,
    guesses,
    incrementTurn,
    playNotes,
    turn,
  ]);
  useEffect(() => {
    playNotes([guesses[selectedNoteIndex]], chosenSong.bpm);
  }, [chosenSong.bpm, guesses, playNotes, selectedNoteIndex]);
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
  }, [
    chosenSong.bpm,
    chosenSong.notes.length,
    guesses,
    handleCheckGuess,
    incrementGuessDuration,
    incrementGuessPitch,
    selectedNoteIndex,
    setSelectedNoteIndex,
  ]);

  return (
    <div className="App" style={{ backgroundColor: BACKGROUND_COLOR }}>
      <header>
        <h1>Musicle!</h1>
        <div>Try to guess the riff.</div>
        <div>{chosenSong.bpm}bpm</div>
        <div>{chosenSong.timeSignature}</div>
      </header>

      <main>
        <SVGScore correctNotes={chosenSong.notes} />
        <PitchKeyboard />
        <DurationKeyboard />
        <div>Use Left and Right Arrows to select a note (or click on it).</div>
        <div>
          Use 'W' and 'S' to increase or decrease the pitch of the selected
          note.
        </div>
        <div>
          Use 'A' and 'D' to increase or decrease the duration of the selected
          note.
        </div>
        <button onClick={handleCheckGuess}>Check Guesses</button>
      </main>
    </div>
  );
};

export default App;
