import {
  chosenSong,
  daysSinceBeginning,
  queryParamSongIndex,
} from "src/constants/game";
import { Modal } from "./Modal";

export const SongSelectModal = () => {
  return (
    <Modal
      title={"Song " + queryParamSongIndex + ": " + chosenSong.bpm}
      visible={true}
      closeText="Another!"
      toggleVisible={() => {
        if ("URLSearchParams" in window) {
          var searchParams = new URLSearchParams(window.location.search);
          searchParams.set(
            "chosenSongIndex",
            ((queryParamSongIndex + 1) % daysSinceBeginning).toString()
          );
          window.location.search = searchParams.toString();
        }
      }}
    >
      <p>Pick a new song?</p>
    </Modal>
  );
};
