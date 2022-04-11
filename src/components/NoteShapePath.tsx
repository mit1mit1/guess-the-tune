import { Duration } from "src/types";
import { getRootCircleCX } from "src/utils";


interface UpStrokeProps {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
}

const UpStroke = ({ xStart, yStart, color, opacity }: UpStrokeProps) => {
  return (
    <path
      strokeWidth="4"
      stroke={color}
      opacity={opacity}
      d={`M${xStart} ${yStart} V ${yStart + 200}`}
    />
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
    <line
      strokeWidth="16"
      stroke={color}
      opacity={opacity}
      x1={xStart} y1={yStart} x2={xStart + 80} y2={yStart - 15}
    />
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
    <line
      strokeWidth="16"
      stroke={color}
      opacity={opacity}
      x1={xStart} y1={yStart} x2={xStart + 80} y2={yStart - 15}
    />
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
    <circle
      cx={xCentre}
      cy={yCentre}
      r="5"
      stroke={color}
      opacity={opacity}
      strokeWidth="3"
      fill={color}
    />
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
  handleClick?: () => void;
  strokeColor: string;
  fillColor: string;
  xCentre: number;
  yCentre: number;
}

const RootCircle = ({
  handleClick,
  strokeColor,
  fillColor,
  opacity = 1,
  xCentre,
  yCentre,
}: RootCircleProps) => {
  return (
    <g transform={`rotate(-20, ${xCentre}, ${yCentre})`} >
      <ellipse
        onClick={handleClick}
        cx={xCentre}
        cy={yCentre}
        rx="42"
        ry="34"
        stroke={strokeColor}
        opacity={opacity}
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
    <>
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
        handleClick={handleClick}
        strokeColor={color}
        fillColor={shouldFillInCircle(duration) ? color : "white"}
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
    </>
  );
};