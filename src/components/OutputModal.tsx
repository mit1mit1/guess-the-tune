import { chosenSong } from "src/constants/game";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";
import CryptoJS from "crypto-js";
import { useState } from "react";

export const OutputModal = () => {
  const { showOutput, toggleOutputModal, guesses } = useStore();
  const song = chosenSong;
  const [songName, setSongName] = useState(chosenSong.name);
  song.notes = guesses;
  let encryptedString = CryptoJS.AES.encrypt(JSON.stringify({ ...song, name: songName }), "Secret Passphrase").toString();
  let path = window.location.href.split('?')[0]
  let queryString = new URLSearchParams({ songHash: encryptedString }).toString()
  if (showOutput) {
    console.log(JSON.stringify(song))
  }
  return (
    <Modal
      title="Share Song"
      visible={showOutput}
      toggleVisible={toggleOutputModal}
    >
      <div>
        Name: <input onChange={(e) => setSongName(e.target.value)} value={songName} />

      </div>
      <a href={`${path}?${queryString}`}>
        {path} ? {queryString}
      </a>
    </Modal >
  );
};
