import { chosenSong } from "src/constants/game";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";
import { useState } from "react";
import { encodeSong } from "src/utils/encoder";

export const OutputModal = () => {
  const { showOutput, toggleOutputModal, guesses, bpm, overrideBPM } = useStore();
  const song = chosenSong;
  const [songName, setSongName] = useState(chosenSong.name);
  song.notes = guesses;
  let encryptedString = encodeSong({ ...song, name: songName, bpm });
  let path = window.location.href.split('?')[0]
  let queryString = new URLSearchParams({ songHash: encryptedString }).toString()
  if (showOutput) {
    console.log(JSON.stringify(song))
  }
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(`Try and guess the tune I wrote with Musicle: ${path}?${queryString}`);
  }
  return (
    <Modal
      title="Share Song"
      visible={showOutput}
      toggleVisible={toggleOutputModal}
    >
      <div>
        <label htmlFor="customSongName">Name: </label>
        <input id="customSongName" type="text" name="customSongName" onChange={(e) => setSongName(e.target.value)} value={songName} />
      </div>
      <div>
        <label htmlFor="customSongBPM">BPM: </label>
        <input id="customSongBPM" type="number" name="customSongBPM" onChange={(e) => overrideBPM(parseInt(e.target.value))} value={bpm} />
      </div>
      <button onClick={copyLinkToClipboard}>
        Copy link
      </button>
    </Modal >
  );
};
