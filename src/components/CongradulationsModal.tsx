import { Modal } from "./Modal";

export const CongradulationsModal = () => {
  return (
    <Modal
      title="<E3><81><8A><E3><82><81><E3><81><A7><E3><81><A8><E3><81><86>"
      visible={true}
      toggleVisible={() => window.location.reload()}
    >
      <p>Congradulations!!</p>
      <p>Got it in n turns</p>
      <p>Listen to the song on spotify or something.</p>
    </Modal>
  );
};
