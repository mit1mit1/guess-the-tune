import { daysSinceBeginning, queryParamSongIndex } from "src/constants/game";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";

export const CongratulationsModal = () => {
  const { turn } = useStore();
  return (
    <Modal
      title="Well done!"
      visible={true}
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
      <p>Congratulations!!</p>
      <p>Got it in {turn} turns</p>
      <p>Listen to the song on spotify or something.</p>
    </Modal>
  );
};