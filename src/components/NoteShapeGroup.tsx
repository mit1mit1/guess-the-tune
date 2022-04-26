import { maxNoteXLength } from "src/constants/svg";
import { BaseDuration, Duration } from "src/types";
import { NoteShapePath } from "./NoteShapePath";

interface TiePathProps {
  opacity?: number;

  handleClick?: () => void;
  color: string;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
}

const TiePath = ({ xStart, yStart, xEnd, yEnd, color, opacity, handleClick }: TiePathProps) => {
  return <path fill={color} opacity={opacity} onClick={handleClick} d={`M ${xStart} ${yStart} A 50 10 0 0 1 ${xEnd} ${yEnd}`} />;
};

interface NoteShapeGroupProps {
  opacity?: number;
  durationObject: Duration;
  baseXPosition: number;
  baseYPosition: number;
  handleClick?: () => void;
  color: string;
}

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
      buffer.push(<TiePath handleClick={handleClick}
        color={color}
        opacity={opacity} xStart={baseXPosition + (groupCounter - 1) * maxNoteXLength} yStart={baseYPosition} xEnd={baseXPosition + (groupCounter) * maxNoteXLength} yEnd={baseYPosition} />);
    }
    for (let n = 0; n < multiplier; n++) {
      if (n > 0) {
        buffer.push(<TiePath handleClick={handleClick}
          color={color}
          opacity={opacity} xStart={baseXPosition + (groupCounter - 1) * maxNoteXLength} yStart={baseYPosition} xEnd={baseXPosition + (groupCounter) * maxNoteXLength} yEnd={baseYPosition} />);
      }
      buffer.push(
        <NoteShapePath
          duration={baseDuration as BaseDuration}
          handleClick={handleClick}
          color={color}
          opacity={opacity}
          baseXPosition={baseXPosition + groupCounter * maxNoteXLength}
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
