import { useStore } from "src/store/gameStore";
import { Modal } from "./Modal";
import { MultipageContent } from "./MultipageContent";
import { DurationlessPitchPath } from "./svg/DurationlessPitchPath";
import { FillDefs } from "./svg/FillDefs";
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
        <FillDefs />
        <DurationlessPitchPath
          color="url(#CORRECT_PITCH_FILL)"
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
        <FillDefs />
        <NoteShapePath
          color="url(#CORRECT_FILL)"
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
        <FillDefs />
        <NoteShapePath
          color="url(#WRONG_SPOT_FILL)"
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
        <FillDefs />
        <DurationlessPitchPath
          color="url(#INCORRECT_FILL)"
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
