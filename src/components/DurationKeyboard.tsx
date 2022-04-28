import { Duration } from "src/types";
import { BASE_COLOR, WRONG_SPOT_COLOR } from "src/constants";
import { useStore } from "src/gameStore";
import "./DurationKey.css";
import { NoteShapeGroup } from "src/components/NoteShapeGroup";
import { numberOfNotePaths, setIncludes } from "src/utils";

interface DurationKeyProps {
  durationObject: Duration;
  status: "unknown" | "wrong-spot" | "unavailable";
  width: number;
}

const DurationKeySVGHeight = 220;

const DurationKey = ({ durationObject, status, width }: DurationKeyProps) => {
  const { setSelectedGuessDuration } = useStore((state) => state);
  if (status === "unavailable") {
    return <></>;
  }
  let color = BASE_COLOR;
  if (status === "wrong-spot") {
    color = WRONG_SPOT_COLOR;
  }
  return (
    <>
      <div className="duration-key" style={{width: `${50 * numberOfNotePaths(durationObject)}px`}}>
        <svg
          viewBox={`0 0 ${width} ${DurationKeySVGHeight}`}
          xmlns="<http://www.w3.org/2000/svg>"
          className="duration-key-svg"
        >
          <NoteShapeGroup
            durationObject={durationObject}
            baseXPosition={50}
            baseYPosition={50}
            color={color}
            handleClick={() => setSelectedGuessDuration(durationObject)}
          />
        </svg>
      </div>
    </>
  );
};

export const DurationKeyboard = () => {
  const { availableDurations, wrongSpotDurations } = useStore((state) => state);
  const buffer: Array<JSX.Element> = [];
  availableDurations.forEach((durationObject, index) => {
    const DurationKeySVGWidth = 220 * numberOfNotePaths(durationObject);
    if (setIncludes(wrongSpotDurations, durationObject)) {
      buffer.push(
        <DurationKey
          key={"duration-key-" + index}
          durationObject={durationObject}
          status="wrong-spot"
          width={DurationKeySVGWidth}
        />
      );
    } else {
      buffer.push(
        <DurationKey
          key={"duration-key-" + index}
          durationObject={durationObject}
          status="unknown"
          width={DurationKeySVGWidth}
        />
      );
    }
  });
  return (
    <div className="duration-keyboard">
      <div>Available Durations</div>
      <div className="duration-keys">{buffer}</div>
    </div>
  );
};
