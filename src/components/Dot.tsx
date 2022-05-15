import { BaseSVGPathProps } from "src/types";

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
          className="clickable-cover"
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
