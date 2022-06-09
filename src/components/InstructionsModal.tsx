import {
  CORRECT_COLOR,
  CORRECT_PITCH_COLOR,
  INCORRECT_COLOR,
  WRONG_SPOT_COLOR,
} from "src/constants";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";
import { DurationlessPitchPath } from "./svg/DurationlessPitchPath";
import { NoteShapePath } from "./svg/NoteShapePath";

export const InstructionsModal = () => {
  const { showInstructions, toggleInstructions } = useStore();
  return (
    <Modal
      title="Guess the Tune"
      visible={showInstructions}
      toggleVisible={toggleInstructions}
    >
      <p>Use Left/Right Arrows to select a note (or click it).</p>
      <p>Use 'W'/'S' to change the pitch of the selected note, or click one of the Available Pitches.</p>
      <p>Use 'A'/'D' to change the duration of the selected note, or click one of the Available Durations..</p>
      <p>
        <svg
          viewBox={`0 0 ${100} ${100}`}
          xmlns="<http://www.w3.org/2000/svg>"
          style={{ width: "30px", height: "1.5em" }}
        >
          <DurationlessPitchPath
            color={CORRECT_PITCH_COLOR}
            pitch={"F5"}
            xStart={25}
          />
        </svg>{" "}
        means that the pitch in this position is correct.
      </p>

      <p>
        <svg
          viewBox={`0 0 ${200} ${220}`}
          xmlns="<http://www.w3.org/2000/svg>"
          style={{ width: "30px", height: "2em" }}
        >
          <NoteShapePath
            color={CORRECT_COLOR}
            duration={"4n"}
            baseXPosition={80}
            baseYPosition={160}
          />
        </svg>{" "}
        means that the duration in this position is correct.
      </p>

      <p>
        <svg
          viewBox={`0 0 ${200} ${220}`}
          xmlns="<http://www.w3.org/2000/svg>"
          style={{ width: "30px", height: "2em" }}
        >
          <NoteShapePath
            color={WRONG_SPOT_COLOR}
            duration={"4n"}
            baseXPosition={80}
            baseYPosition={160}
          />
        </svg>{" "}
        means that the duration in this position is incorrect, but would be
        correct somewhere you haven't guessed yet.
      </p>
      <p>
        <svg
          viewBox={`0 0 ${100} ${100}`}
          xmlns="<http://www.w3.org/2000/svg>"
          style={{ width: "30px", height: "1.5em" }}
        >
          <DurationlessPitchPath
            color={INCORRECT_COLOR}
            pitch={"F5"}
            xStart={25}
          />
        </svg>{" "}
        means that the pitch in this position is incorrect.
      </p>
    </Modal>
  );
};
