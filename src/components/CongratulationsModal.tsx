import {
  chosenSong,
  maxAvailableArchiveSongs,
  queryParamSongIndex,
} from "src/constants/game";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";
import dayjs from "dayjs";
import appStyles from './App.module.scss';

const loadTime = dayjs();

export const CongratulationsModal = () => <div/>;
