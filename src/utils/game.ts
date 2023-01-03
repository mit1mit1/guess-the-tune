import { gameSongs } from "src/gameSongs";
import {
  availableIndices,
  availableSongs,
} from "src/constants/songHistory";
import { getAllGuessed } from "src/persistantState/dynamic";

export const getNextUnguessedIndex = () => {
  const unguessedAvailbleIndices = availableIndices.filter(
    (index: any) => !getAllGuessed().includes(index)
  );
  if (unguessedAvailbleIndices.length) {
    return availableSongs.indexOf(gameSongs[unguessedAvailbleIndices[0]]);
  }
  return 0;
};
