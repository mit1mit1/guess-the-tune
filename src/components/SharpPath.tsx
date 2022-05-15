import { sharpHeight } from "src/constants/svg";

export const SharpPath = ({
  xStart,
  yStart,
  color,
  opacity = 1,
  strokeWidth,
  handleClick,
}: {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
  strokeWidth: number;
  handleClick?: () => void;
}) => {
  return (
    <>
      <line
        strokeWidth={strokeWidth * 2}
        stroke={color}
        opacity={opacity}
        x1={xStart + 60}
        y1={yStart + (sharpHeight * 5) / 16}
        x2={xStart}
        y2={yStart + (sharpHeight * 7) / 16}
        className={handleClick ? "clickable-svg" : ""}
        onClick={handleClick}
      />
      <line
        strokeWidth={strokeWidth * 2}
        stroke={color}
        opacity={opacity}
        x1={xStart + 60}
        y1={yStart + (sharpHeight * 9) / 16}
        x2={xStart}
        y2={yStart + (sharpHeight * 11) / 16}
        className={handleClick ? "clickable-svg" : ""}
        onClick={handleClick}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 40} ${yStart} V ${yStart + sharpHeight}`}
        className={handleClick ? "clickable-svg" : ""}
        onClick={handleClick}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 20} ${yStart} V ${yStart + sharpHeight}`}
        className={handleClick ? "clickable-svg" : ""}
        onClick={handleClick}
      />
      {handleClick && (
        <rect
          className="clickable-cover"
          stroke=""
          opacity={0}
          x={xStart}
          y={yStart}
          width={60}
          height={sharpHeight}
        />
      )}
    </>
  );
};
