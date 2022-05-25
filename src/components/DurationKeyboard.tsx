import { Duration } from "src/types";
import { BASE_COLOR, WRONG_SPOT_COLOR } from "src/constants";
import { useStore } from "src/gameStore";
import "./DurationKey.css";
import { NoteShapeGroup } from "src/components/NoteShapeGroup";
import { numberOfNotePaths, setIncludes } from "src/utils";
import { rootCircleXRadius, rootCircleYRadius, UpStrokeLength } from "src/constants/svg";
import svgStyles from "src/components/SVGScore.module.scss"



interface DurationKeyProps {
  durationObject: Duration;
  status: "unknown" | "wrong-spot" | "unavailable";
  width: number;
}

const DurationKeySVGHeight = 220;

const DurationKey = ({ durationObject, status, width }: DurationKeyProps) => {
  const { setSelectedGuessDuration } = useStore();
  if (status === "unavailable") {
    return <></>;
  }
  let color = BASE_COLOR;
  if (status === "wrong-spot") {
    color = WRONG_SPOT_COLOR;
  }
  const handleClick = () => setSelectedGuessDuration(durationObject)
  return (
    <>
      <div
        className="duration-key"
        style={{ width: `${50 * numberOfNotePaths(durationObject)}px` }}
      >
        <svg
          viewBox={`0 0 ${width} ${DurationKeySVGHeight}`}
          xmlns="<http://www.w3.org/2000/svg>"
          className="duration-key-svg"
        >
          {(
            <rect
              className={svgStyles.clickableCover}
              stroke=""
              opacity={0}
              x={150 - 2 * rootCircleXRadius}
              y={50 + UpStrokeLength - 15}
              width={3 * rootCircleXRadius}
              height={-UpStrokeLength + rootCircleYRadius}
              onClick={handleClick}
            />
          )}
          <NoteShapeGroup
            durationObject={durationObject}
            baseXPosition={150}
            baseYPosition={50}
            color={color}
            handleClick={handleClick}
          />
        </svg>
      </div>
    </>
  );
};

export const DurationKeyboard = () => {
  const { availableDurations, wrongSpotDurations } = useStore();
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
      <h2>Available Durations</h2>
      <div className="duration-keys">{buffer}</div>
    </div>
  );
};
