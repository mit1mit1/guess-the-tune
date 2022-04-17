export const SharpPath = ({
  xStart,
  yStart,
  color,
  opacity = 1,
  strokeWidth,
  handleClick
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
        y1={yStart + 25}
        x2={xStart}
        y2={yStart + 35}
        className={handleClick? "clickable-svg" : ""}
        onClick={handleClick}
      />
      <line
        strokeWidth={strokeWidth * 2}
        stroke={color}
        opacity={opacity}
        x1={xStart + 60}
        y1={yStart + 45}
        x2={xStart}
        y2={yStart + 55}
        className={handleClick? "clickable-svg" : ""}
        onClick={handleClick}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 40} ${yStart} V ${yStart + 80}`}
        className={handleClick? "clickable-svg" : ""}
        onClick={handleClick}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 20} ${yStart} V ${yStart + 80}`}
        className={handleClick? "clickable-svg" : ""}
        onClick={handleClick}
      />
      <ellipse
        className="clickable-cover"
        stroke=""
        opacity={0}
        cx={xStart + 30}
        cy={yStart + 40}
        rx={30}
        ry={40}
      />
    </>
  );
};
