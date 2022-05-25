import { BaseSVGPathProps } from "src/types";
import svgStyles from "src/components/SVGScore.module.scss"

interface DotProps extends BaseSVGPathProps {
  xCentre: number;
  yCentre: number;
}

export const Dot = ({
  color,
  opacity,
  xCentre,
  yCentre,
  handleClick,
}: DotProps) => {
  return (
    <>
      {handleClick && (
        <rect
          className={svgStyles.clickableCover}
          stroke=""
          opacity={0}
          x={xCentre - 15}
          y={yCentre - 15}
          width={30}
          height={30}
        />
      )}
      <circle
        cx={xCentre}
        cy={yCentre}
        r="5"
        stroke={color}
        opacity={opacity}
        strokeWidth="3"
        fill={color}
      />
    </>
  );
};
