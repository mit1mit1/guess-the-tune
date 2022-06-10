import {
  chosenSong,
  maxAvailableArchiveSongs,
  queryParamSongIndex,
} from "src/constants/game";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";
import dayjs from "dayjs";
import appStyles from './App.module.scss';

const loadTime = dayjs();

export const CongratulationsModal = () => {
  const { turn, showCongrats, toggleCongrats } = useStore();
  const handleAnother = () => {
    if ("URLSearchParams" in window) {
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set(
        "chosenSongIndex",
        ((queryParamSongIndex + 1) % maxAvailableArchiveSongs).toString()
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
        Guessed <i>{chosenSong.name}</i> in {turn} turns,{" "}
        {dayjs().diff(loadTime, "s", true).toFixed(2)} seconds.
      </p>
      <p>Come back tomorrow for a new tune, or in the meantime, try one from the archives?</p>
      <button className={appStyles.button + ' ' + appStyles.buttonPrimary} onClick={handleAnother}>Another!</button>
    </Modal>
  );
};
