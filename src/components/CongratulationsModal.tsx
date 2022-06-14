import {
  chosenSong,
  maxAvailableArchiveSongs,
} from "src/constants/game";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";
import appStyles from "./App.module.scss";
import { getTimePlayed, getTodaysTurns, getNextUnguessedIndex } from "src/utils/game";

export const CongratulationsModal = () => <div/>;
