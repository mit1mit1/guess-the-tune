import { chosenSong } from "src/constants/chosenSong";
import { useStore } from "src/store/gameStore";
import { Modal } from "./Modal";
import { useState } from "react";
import { encodeSong } from "src/utils/encoder";
import styles from "./App.module.scss";

export const OutputModal = () => {
  const { showOutput, toggleOutputModal, guesses, bpm, overrideBPM } = useStore();
  const song = chosenSong;
  const [songName, setSongName] = useState(chosenSong.name);
  const [copied, setCopied] = useState(false);
  song.notes = guesses;
  let encryptedString = encodeSong({ ...song, name: songName, bpm });
  let path = window.location.href.split('?')[0]
  let queryString = new URLSearchParams({ songHash: encryptedString }).toString()
  const copyLinkToClipboard = () => {
    if (showOutput) {
      console.log(JSON.stringify(song))
    }
    navigator.clipboard.writeText(`${path}?${queryString}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <Modal
      title="Share Song"
      visible={showOutput}
      toggleVisible={toggleOutputModal}
    >
      <div className={styles.formRow}>
        <div>
          <label htmlFor="customSongName">Name: </label>
        </div>
        <div>
          <input id="customSongName" type="text" name="customSongName" onChange={(e) => {
            setSongName(e.target.value);
            setCopied(false)
          }} value={songName} />
        </div>
      </div>
      <div className={styles.formRow}>
        <div>
          <label htmlFor="customSongBPM">BPM: </label>
        </div>
        <div>
          <input id="customSongBPM" type="number" name="customSongBPM" onChange={(e) => {
            overrideBPM(parseInt(e.target.value));
            setCopied(false)
          }} value={bpm} />
        </div>
      </div>
      <button className={styles.button} onClick={copyLinkToClipboard}>
        Copy link
      </button>{copied && "Copied!"}
    </Modal >
  );
};
