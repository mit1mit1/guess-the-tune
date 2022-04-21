import { BaseDuration, Duration } from "src/types";
import { NoteShapePath } from "./NoteShapePath";

const TiePath = () => {
  return <div>(</div>;
};

interface NoteShapeGroupProps {
  opacity?: number;
  durationObject: Duration;
  baseXPosition: number;
  baseYPosition: number;
  handleClick?: () => void;
  color: string;
}

const noteSeparation = 50;

export const NoteShapeGroup = ({
  durationObject,
  handleClick,
  color,
  opacity = 1,
  baseXPosition,
  baseYPosition,
}: NoteShapeGroupProps) => {
  const buffer: Array<JSX.Element> = [];
  let groupCounter = 0;
  let index = 0;
  for (const [baseDuration, multiplier] of Object.entries(durationObject)) {
    if (index > 0) {
      buffer.push(<TiePath />);
    }
    for (let n = 0; n < multiplier; n++) {
      if (n > 0) {
        buffer.push(<TiePath />);
      }
      buffer.push(
        <NoteShapePath
          duration={baseDuration as BaseDuration}
          handleClick={handleClick}
          color={color}
          opacity={opacity}
          baseXPosition={baseXPosition + groupCounter * noteSeparation}
          baseYPosition={baseYPosition}
        />
      );
      groupCounter++;
    }
    index++;
  }
  return (
    <g className={handleClick ? "clickable-svg" : ""} onClick={handleClick}>
      {buffer}
    </g>
  );
};
