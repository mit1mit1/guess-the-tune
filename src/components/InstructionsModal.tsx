import {
  CORRECT_COLOR,
  CORRECT_PITCH_COLOR,
  INCORRECT_COLOR,
  WRONG_SPOT_COLOR,
} from "src/constants";
import { useStore } from "src/gameStore";
import { Modal } from "./Modal";
import { MultipageContent } from "./MultipageContent";
import { DurationlessPitchPath } from "./svg/DurationlessPitchPath";
import { NoteShapePath } from "./svg/NoteShapePath";

const isTouchDevice = "ontouchstart" in document.documentElement;

const ControlInstructions = () => (
  <>
    {isTouchDevice ? (
      <p>Click a note to select it.</p>
    ) : (
      <p>Use Left/Right Arrows to select a note (or click it).</p>
    )}
    {isTouchDevice ? (
      <p>
        Click one of the <b>Available Pitches</b> to set the pitch of the
        selected note.
      </p>
    ) : (
      <p>
        Use 'W'/'S' to change the pitch of the selected note, or click one of
        the <b>Available Pitches.</b>
      </p>
    )}

    {isTouchDevice ? (
      <p>
        Click one of the <b>Available Durations</b> to set the duration of the
        selected note.
      </p>
    ) : (
      <p>
        Use 'A'/'D' to change the duration of the selected note, or click one of
        the <b>Available Durations</b>.
      </p>
    )}
  </>
);

const DisplayInstructions = () => (
  <>
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
          baseXPosition={140}
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
          baseXPosition={140}
          baseYPosition={160}
        />
      </svg>{" "}
      means that this duration is in the song somewhere.
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
  </>
);

const RuleInstructions = () => (
  <>
    <p>
      There are 4 notes per line, regardless of their length. The tune itself
      may be any number of beats.
    </p>
    <p>
      The key has been chosen to be as close to <i>C Major</i> as possible: that
      is, there will be as few sharps as the tune allows.
    </p>
    <p>
      The first pitch and the last duration are set to be correct by default.
    </p>
  </>
);

export const InstructionsModal = () => {
  const { showInstructions, toggleInstructions } = useStore();
  return (
    <Modal
      title="Guess the Tune"
      visible={showInstructions}
      toggleVisible={toggleInstructions}
    >
      <MultipageContent
        pages={[
          <ControlInstructions />,
          <DisplayInstructions />,
          <RuleInstructions />,
        ]}
      />
    </Modal>
  );
};
