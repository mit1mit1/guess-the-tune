import { chosenSong } from "src/constants/chosenSong";
import { queryParamSongIndex } from "src/constants/queryParams";
import { Modal } from "./Modal";
import { useState } from "react";

export const SongSelectModal = () => {
  const [show, setShow] = useState(true);
  return (
    <Modal
      title={"Song " + queryParamSongIndex + ": " + chosenSong.bpm + "bpm"}
      visible={show}
      toggleVisible={() => setShow(false)}
    >
      <p>
        Pick a different song from the archives by changing{" "}
        <i>chosenSongIndex={queryParamSongIndex}</i> in the url.
      </p>
    </Modal>
  );
};
