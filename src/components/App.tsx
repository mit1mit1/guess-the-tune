import { useCallback, useEffect } from "react";
import { SVGScore } from "src/components/svg/SVGScore";
import { useStore } from "src/store/gameStore";
import styles from "./App.module.scss";
import { DurationKeyboard } from "./DurationKeyboard";
import { BACKGROUND_COLOR, BASE_COLOR } from "../constants/color";
import { PitchKeyboard } from "./PitchKeyboard";
import { Note } from "../types";
import { NoteShapePath } from "src/components/svg/NoteShapePath";
import { maxNoteXLength } from "../constants/svg";
import { InstructionsModal } from "./InstructionsModal";
import { CongratulationsModal } from "./CongratulationsModal";
import { SupportUsModal } from "./SupportUsModal";
import { chosenSong } from "src/constants/chosenSong";
import { composeMode, queryParamSongIndex } from "src/constants/queryParams";
import { SongSelectModal } from "./SongSelectModal";
import { OutputModal } from "./OutputModal";

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
    guessedEverythingCorrect,
    toggleInstructions,
    toggleSupportUs,
    toggleOutputModal,
    correctNotes,
    addNote,
    removeNote,
    showOutput,
    bpm,
    switchIsRest,
    switchIsStaccato,
  } = useStore();

  const handleCheckGuess = useCallback(() => {
    incrementTurn();
    checkGuesses();
    playNotes([...guesses], bpm);
  }, [checkGuesses, guesses, incrementTurn, playNotes, bpm]);
  useEffect(() => {
    playNotes([guesses[selectedNoteIndex]], bpm);
  }, [guesses, playNotes, selectedNoteIndex, bpm]);
  useEffect(() => {
    if (showOutput) {
      // Don't allow song to be changed while user is typing in the name
      return;
    }
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
    guesses,
    handleCheckGuess,
    incrementGuessDuration,
    incrementGuessPitch,
    selectedNoteIndex,
    setSelectedNoteIndex,
    showOutput,
  ]);

  const path = window.location.href.split('?')[0]


  return (
    <div className={styles.App} style={{ backgroundColor: BACKGROUND_COLOR }}>
      <main>
        <svg
          viewBox={`0 0 ${maxNoteXLength * 6} ${220}`}
          xmlns="<http://www.w3.org/2000/svg>"
          className={styles.inlineSVGText}
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
            = {bpm}
          </text>
        </svg>
        <SVGScore correctNotes={correctNotes} />
        <PitchKeyboard />
        <DurationKeyboard />
        {guessedEverythingCorrect && <CongratulationsModal />}
        <InstructionsModal />
        <SupportUsModal />
        <OutputModal />
        {queryParamSongIndex !== -1 ? <SongSelectModal /> : ""}
        <div>
          {composeMode ? <>
            <div>
              <button className={styles.button + " " + styles.buttonPrimary} onClick={toggleOutputModal}>
                Share/Tweak Song
              </button>
              <button
                className={styles.button}
                onClick={handleCheckGuess}
              >
                Play Notes
              </button>
              <button className={styles.button} onClick={addNote}>
                Add Note
              </button>
              <button className={styles.button} onClick={removeNote}>
                Remove Note
              </button>
              <button className={styles.button} onClick={switchIsRest}>
                {correctNotes[selectedNoteIndex].rest ? "Unrest" : "Make Rest"}
              </button>
              <button className={styles.button} onClick={switchIsStaccato}>
                {correctNotes[selectedNoteIndex].staccato ? "Unstaccato" : "Make Staccato"}
              </button>
            </div>
            <div>
              <button className={styles.button} onClick={() => { window.open(`${path}`, "_blank") }}>
                Normal Game
              </button>
              <button className={styles.button} onClick={toggleSupportUs}>
                Support Us
              </button>
            </div>
          </> : <>
            <div>
              <button
                className={styles.button + " " + styles.buttonPrimary}
                onClick={handleCheckGuess}
              >
                Check Guesses
              </button>
              <button
                className={styles.button}
                onClick={() => toggleInstructions()}
              >
                Show Instructions
              </button>

            </div>
            <div>
              <button className={styles.button} onClick={() => { window.open(`${path}?composeMode=1`, "_blank") }}>
                Compose Mode
              </button>
              <button className={styles.button} onClick={() => toggleSupportUs()}>
                Support Us
              </button>
            </div>
          </>}
        </div>
      </main>
    </div>
  );
};

export default App;
