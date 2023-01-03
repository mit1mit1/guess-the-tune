import {
  maxAvailableArchiveSongs,
} from "src/constants/game";
import { useStore } from "src/store/gameStore";
import { Modal } from "./Modal";
import appStyles from "./App.module.scss";
import { chosenSong, chosenSongIndex } from "src/constants/chosenSong";
import { getNextUnguessedIndex, getScore } from "src/utils/game";
import { getTodaysTurns, getTimePlayed } from "src/persistantState/dynamic";
import { useState } from "react";

export const CongratulationsModal = () => {
  const { turn, showCongrats, toggleCongrats } = useStore();
  const [copied, setCopied] = useState(false);

  const handleAnother = () => {
    if ("URLSearchParams" in window) {
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set(
        "chosenSongIndex",
        (getNextUnguessedIndex() % maxAvailableArchiveSongs).toString()
      );
      searchParams.delete("songHash");
      window.location.search = searchParams.toString();
    }
  };

  const timeTaken = getTimePlayed();
  const guessCount = getTodaysTurns();
  const score = getScore(timeTaken, guessCount, chosenSong.notes.length).toFixed(0);
  const maxScore = getScore("1", "1", chosenSong.notes.length).toFixed(0)
  const location = window.location.href

  const copyBrag = () => {
    navigator.clipboard.writeText(`I guessed Musicle number ${chosenSongIndex} in ${getTodaysTurns() || turn} turns, ${getTimePlayed()} seconds.\nScore: ${score} / ${maxScore}.\n\n${location}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Modal
      title="Well done!"
      visible={showCongrats}
      // closeText="Another!"
      toggleVisible={toggleCongrats}
    >
      <p>Congratulations!! Guessed <i>{chosenSong.name}</i> in {getTodaysTurns() || turn} turns,{" "}
        {getTimePlayed()} seconds.
      </p>
      <p>
        Score: {score} / {maxScore}
      </p>
      <p>
        Come back tomorrow for a new tune, or in the meantime, try one from the
        archives?
      </p>
      <button
        className={appStyles.button + " " + appStyles.buttonPrimary}
        onClick={handleAnother}
      >
        Another!
      </button>
      <button
        className={appStyles.button}
        onClick={copyBrag}
      >
        Copy Result
      </button>{copied && "Copied!"}
    </Modal>
  );
};
