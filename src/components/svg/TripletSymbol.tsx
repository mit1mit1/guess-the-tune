import { maxNoteXLength } from "src/constants/svg";
import { BaseSVGPathProps } from "src/types";

interface TripletSymbolProps extends BaseSVGPathProps {
  xCentre: number;
  yCentre: number;
}

export const TripletSymbol = ({
  color,
  opacity,
  xCentre,
  yCentre,
  handleClick,
}: TripletSymbolProps) => {
  return (
    <text
      style={{ fontSize: `${maxNoteXLength * 0.5}px` }}
      width={maxNoteXLength}
      x={xCentre}
      y={yCentre}
      fill={color}
      opacity={opacity}
      onClick={handleClick}
    >
      3
    </text>
  );
};
