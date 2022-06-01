import { sharpHeight } from "src/constants/svg";
import svgStyles from "src/components/svg/SVGScore.module.scss";

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
        className={handleClick ? svgStyles.clickableSVG : ""}
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
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 40} ${yStart} V ${yStart + sharpHeight}`}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 20} ${yStart} V ${yStart + sharpHeight}`}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
      />
      {handleClick && (
        <rect
          className={svgStyles.clickableCover}
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
