import { chosenSong } from "src/constants/game";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";

export const OutputModal = () => {
  const { showOutput, toggleOutputModal, guesses } = useStore();
  const song = chosenSong;
  song.notes = guesses;
  return (
    <Modal
      title="Song JSON"
      visible={showOutput}
      toggleVisible={toggleOutputModal}
    >
      {JSON.stringify(song)}
    </Modal>
  );
};
