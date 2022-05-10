import { useCallback, useEffect } from "react";
import { SVGScore } from "src/components/SVGScore";
import { allCorrect } from "./utils";
import { useStore } from "src/gameStore";
import "./App.css";
import { DurationKeyboard } from "./components/DurationKeyboard";
import { BACKGROUND_COLOR, BASE_COLOR } from "./constants";
import { PitchKeyboard } from "./components/PitchKeyboard";
import { Note } from "./types";
import { NoteShapePath } from "./components/NoteShapePath";
import { maxNoteXLength } from "./constants/svg";
import { InstructionsModal } from "./components/InstructionsModal";
import { CongradulationsModal } from "./components/CongradulationsModal";

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
    chosenSong,
    toggleInstructions,
  } = useStore();

  const handleCheckGuess = useCallback(() => {
    incrementTurn();
    checkGuesses();
    playNotes([...guesses], chosenSong.bpm);
  }, [checkGuesses, chosenSong.bpm, guesses, incrementTurn, playNotes]);
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
        <h1>Guess the Tune!</h1>
        <div>
          <svg
            viewBox={`0 0 ${maxNoteXLength} 220`}
            xmlns="<http://www.w3.org/2000/svg>"
            className="inline-svg-icon"
          ></svg>

          <svg
            viewBox={`0 0 ${maxNoteXLength * 6} ${220}`}
            xmlns="<http://www.w3.org/2000/svg>"
            className="inline-svg-text"
          >
            <NoteShapePath
              duration={"4n"}
              baseXPosition={110}
              baseYPosition={180}
              color={BASE_COLOR}
            />
            <text
              style={{ fontSize: `${maxNoteXLength * 0.8}px` }}
              x={maxNoteXLength}
              y={180}
              width={maxNoteXLength}
              fill={BASE_COLOR}
            >
              {" "}
              = {chosenSong.bpm}
            </text>
          </svg>
        </div>
      </header>

      <main>
        <SVGScore correctNotes={chosenSong.notes} />
        <PitchKeyboard />
        <DurationKeyboard />
        {allCorrect(guesses, chosenSong.notes) && <CongradulationsModal />}
        - <InstructionsModal />
        <div>
          <button className="button primary-button" onClick={handleCheckGuess}>
            Check Guesses
          </button>
          <button
            className="button secondary-button"
            onClick={() => toggleInstructions()}
          >
            Show Instructions
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
