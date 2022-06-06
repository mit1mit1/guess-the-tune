import {
  chosenSong,
  queryParamSongIndex,
} from "src/constants/game";
import { Modal } from "./Modal";
import { useState } from "react";

export const SongSelectModal = () => {
  const [show, setShow] = useState(true);
  return (
    <Modal
      title={"Song " + queryParamSongIndex + ": " + chosenSong.bpm + "bpm"}
      visible={show}
      closeText="Close"
      toggleVisible={() => setShow(false)}
    >
      <p>Pick a different song from the archives by changing <i>chosenSongIndex=0</i> in the url.</p>
    </Modal>
  );
};
