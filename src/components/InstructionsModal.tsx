import { useStore } from "src/gameStore";
import { Modal } from "./Modal";

export const InstructionsModal = () => {
  const { showInstructions, toggleInstructions } = useStore();
  return (
    <Modal
      title="Instructions"
      visible={showInstructions}
      toggleVisible={toggleInstructions}
    >
      <p>Use Left and Right Arrows to select a note (or click on it).</p>
      <p>
        Use 'W' and 'S' to increase or decrease the pitch of the selected note.
      </p>
      <p>
        Use 'A' and 'D' to increase or decrease the duration of the selected
        note.
      </p>
    </Modal>
  );
};
