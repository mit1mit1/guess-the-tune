import { Duration } from "src/types";
import { getRootCircleCX } from "src/utils";

const rootCircleXRadius = 42;

interface UpStrokeProps {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
}

const UpStroke = ({ xStart, yStart, color, opacity }: UpStrokeProps) => {
  return (
    <>
      <ellipse
        className="clickable-cover"
        stroke=""
        opacity={0}
        cx={xStart - rootCircleXRadius}
        cy={yStart + 100}
        rx={15 + rootCircleXRadius}
        ry={100}
      />
      <path
        strokeWidth="4"
        stroke={color}
        opacity={opacity}
        d={`M${xStart} ${yStart} V ${yStart + 200}`}
      />
    </>
  );
};

const getEigthLineXStart = (baseXPosition: number) => {
  return baseXPosition + 2;
};

const getEigthLineYStart = (baseYPosition: number) => {
  return baseYPosition - 200 + 8;
};

interface EigthLineProps {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
}

const EigthLine = ({ xStart, yStart, color, opacity }: EigthLineProps) => {
  return (
    <>
      <ellipse
        className="clickable-cover"
        stroke=""
        opacity={0}
        cx={xStart + 40}
        cy={yStart - 7.5}
        rx={40}
        ry={30}
      />
      <line
        strokeWidth="16"
        stroke={color}
        opacity={opacity}
        x1={xStart}
        y1={yStart}
        x2={xStart + 80}
        y2={yStart - 15}
      />
    </>
  );
};

const getSixteenthLineXStart = (baseXPosition: number) => {
  return baseXPosition + 2;
};

const getSixteenthLineYStart = (baseYPosition: number) => {
  return baseYPosition - 200 + 8 + 30;
};

interface SixteenthLineProps {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
}

const SixteenthLine = ({
  xStart,
  yStart,
  color,
  opacity,
}: SixteenthLineProps) => {
  return (
    <>
      <ellipse
        className="clickable-cover"
        stroke=""
        opacity={0}
        cx={xStart + 40}
        cy={yStart - 7.5}
        rx={40}
        ry={30}
      />
      <line
        strokeWidth="16"
        stroke={color}
        opacity={opacity}
        x1={xStart}
        y1={yStart}
        x2={xStart + 80}
        y2={yStart - 15}
      />
    </>
  );
};

const getDotXCentre = (baseXPosition: number) => {
  return baseXPosition + 19;
};

interface DotProps {
  color: string;
  opacity?: number;
  xCentre: number;
  yCentre: number;
}

const Dot = ({ color, opacity, xCentre, yCentre }: DotProps) => {
  return (
    <>
      <ellipse
        className="clickable-cover"
        stroke=""
        opacity={0}
        cx={xCentre}
        cy={yCentre}
        rx={15}
        ry={15}
      />
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

const getUpStrokeXStart = (baseXPosition: number) => {
  return baseXPosition + 2;
};

const drawLineUp = (duration: Duration) => {
  switch (duration) {
    case "1n":
    case "1n.":
      return false;
    default:
      return true;
  }
};

const shouldFillInCircle = (duration: Duration) => {
  switch (duration) {
    case "2n":
    case "2n.":
    case "1n":
    case "1n.":
      return false;
    default:
      return true;
  }
};

const shouldAddDot = (duration: Duration) => {
  return duration.includes(".");
};

const shouldAddEigthLine = (duration: Duration) => {
  switch (duration) {
    case "16n":
    case "8n":
    case "8n.":
      return true;
    default:
      return false;
  }
};

const shouldAddSixteenthLine = (duration: Duration) => {
  if (duration === "16n") {
    return true;
  }
  return false;
};

interface RootCircleProps {
  opacity?: number;
  fillOpacity?: number;
  strokeColor: string;
  fillColor: string;
  xCentre: number;
  yCentre: number;
}

const RootCircle = ({
  strokeColor,
  fillColor,
  fillOpacity = 1,
  opacity = 1,
  xCentre,
  yCentre,
}: RootCircleProps) => {
  return (
    <g transform={`rotate(-20, ${xCentre}, ${yCentre})`}>
      <ellipse
        cx={xCentre}
        cy={yCentre}
        rx={rootCircleXRadius}
        ry="34"
        stroke={strokeColor}
        opacity={opacity}
        fillOpacity={fillOpacity}
        strokeWidth="3"
        fill={fillColor}
      />
    </g>
  );
};

interface NoteShapePathProps {
  opacity?: number;
  duration: Duration;
  baseXPosition: number;
  baseYPosition: number;
  handleClick?: () => void;
  color: string;
}

export const NoteShapePath = ({
  duration,
  handleClick,
  color,
  opacity = 1,
  baseXPosition,
  baseYPosition,
}: NoteShapePathProps) => {
  return (
    <g className={handleClick ? "clickable-svg" : ""} onClick={handleClick}>
      {drawLineUp(duration) && (
        <UpStroke
          xStart={getUpStrokeXStart(baseXPosition)}
          yStart={baseYPosition - 200}
          color={color}
          opacity={opacity}
        />
      )}
      <RootCircle
        xCentre={getRootCircleCX(baseXPosition)}
        yCentre={baseYPosition}
        strokeColor={color}
        fillColor={color}
        fillOpacity={shouldFillInCircle(duration) ? opacity : opacity * 0.1}
        opacity={opacity}
      />
      {shouldAddDot(duration) && (
        <Dot
          xCentre={getDotXCentre(baseXPosition)}
          yCentre={baseYPosition}
          color={color}
          opacity={opacity}
        />
      )}
      {shouldAddEigthLine(duration) && (
        <EigthLine
          yStart={getEigthLineYStart(baseYPosition)}
          xStart={getEigthLineXStart(baseXPosition)}
          color={color}
          opacity={opacity}
        />
      )}
      {shouldAddSixteenthLine(duration) && (
        <SixteenthLine
          yStart={getSixteenthLineYStart(baseYPosition)}
          xStart={getSixteenthLineXStart(baseXPosition)}
          color={color}
          opacity={opacity}
        />
      )}
    </g>
  );
};
