import { chosenSong } from "src/constants/game";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";
import CryptoJS from "crypto-js";

export const OutputModal = () => {
  const { showOutput, toggleOutputModal, guesses } = useStore();
  const song = chosenSong;
  song.notes = guesses;
  const encryptedString = CryptoJS.AES.encrypt(JSON.stringify(song), "Secret Passphrase").toString();
  let path = window.location.href.split('?')[0]
  let queryString = new URLSearchParams({ songHash: encryptedString }).toString()
  return (
    <Modal
      title="Song JSON"
      visible={showOutput}
      toggleVisible={toggleOutputModal}
    >
      <div>
        JSON: {JSON.stringify(song)}
      </div>
      <a href={`${path}?${queryString}`}>
        {path} ? {queryString}
      </a>
    </Modal >
  );
};
