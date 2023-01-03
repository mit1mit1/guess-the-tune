import {
  maxAvailableArchiveSongs,
} from "src/constants/game";
import { useStore } from "src/store/gameStore";
import { Modal } from "./Modal";
import appStyles from "./App.module.scss";
import { chosenSong } from "src/constants/chosenSong";
import { getNextUnguessedIndex } from "src/utils/game";
import { getTodaysTurns, getTimePlayed } from "src/persistantState/dynamic";

export const CongratulationsModal = () => {
  const { turn, showCongrats, toggleCongrats } = useStore();
  const handleAnother = () => {
    if ("URLSearchParams" in window) {
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set(
        "chosenSongIndex",
        (getNextUnguessedIndex() % maxAvailableArchiveSongs).toString()
      );
      window.location.search = searchParams.toString();
    }
  };
  return (
    <Modal
      title="Well done!"
      visible={showCongrats}
      // closeText="Another!"
      toggleVisible={toggleCongrats}
    >
      <p>Congratulations!!</p>
      <p>
        Guessed <i>{chosenSong.name}</i> in {getTodaysTurns() || turn} turns,{" "}
        {getTimePlayed()} seconds.
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
    </Modal>
  );
};
