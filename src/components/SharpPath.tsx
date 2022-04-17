export const SharpPath = ({
  xStart,
  yStart,
  color,
  opacity = 1,
  strokeWidth,
}: {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
  strokeWidth: number;
}) => {
  return (
    <>
      <line
        strokeWidth={strokeWidth * 2}
        stroke={color}
        opacity={opacity}
        x1={xStart + 60}
        y1={yStart + 25}
        x2={xStart}
        y2={yStart + 35}
      />
      <line
        strokeWidth={strokeWidth * 2}
        stroke={color}
        opacity={opacity}
        x1={xStart + 60}
        y1={yStart + 45}
        x2={xStart}
        y2={yStart + 55}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 40} ${yStart} V ${yStart + 80}`}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 20} ${yStart} V ${yStart + 80}`}
      />
    </>
  );
};
