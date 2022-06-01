import { useStore } from "src/gameStore";
import { Modal } from "./Modal";

export const CongratulationsModal = () => {
  const { turn } = useStore();
  return (
    <Modal
      title="Well done!"
      visible={true}
      toggleVisible={() => window.location.reload()}
    >
      <p>Congratulations!!</p>
      <p>Got it in {turn} turns</p>
      <p>Listen to the song on spotify or something.</p>
    </Modal>
  );
};
