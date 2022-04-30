import { eigthLineXLength, eigthLineYLength, rootCircleXRadius, rootCircleYRadius, staccatoDisplacement, UpStrokeLength } from "src/constants/svg";
import { BaseDuration, BaseSVGPathProps } from "src/types";
import { getDurationDotXCentre, getRootCircleCX, shouldAddDurationDot } from "src/utils";
import { Dot } from "./Dot";

interface UpStrokeProps extends BaseSVGPathProps {
  xStart: number;
  yStart: number;
}

const UpStroke = ({ xStart, yStart, color, opacity, handleClick }: UpStrokeProps) => {
  return (
    <>
      {handleClick && <ellipse
        className="clickable-cover"
        stroke=""
        opacity={0}
        cx={xStart - rootCircleXRadius}
        cy={yStart + UpStrokeLength / 2}
        rx={15 + rootCircleXRadius}
        ry={Math.abs(UpStrokeLength) / 2}
      />}
      <path
        strokeWidth="4"
        stroke={color}
        opacity={opacity}
        d={`M${xStart} ${yStart} V ${yStart + UpStrokeLength}`}
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

interface EigthLineProps extends BaseSVGPathProps {
  xStart: number;
  yStart: number;
}

const EigthOrSixteenthLine = ({ xStart, yStart, color, opacity, handleClick }: EigthLineProps) => {
  return (
    <>
      {handleClick && <ellipse
        className="clickable-cover"
        stroke=""
        opacity={0}
        cx={xStart + 40}
        cy={yStart - 7.5}
        rx={40}
        ry={30}
      />}
      <line
        strokeWidth="16"
        stroke={color}
        opacity={opacity}
        x1={xStart}
        y1={yStart}
        x2={xStart + eigthLineXLength}
        y2={yStart + eigthLineYLength}
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

const getUpStrokeXStart = (baseXPosition: number) => {
  return baseXPosition + 2;
};

const drawLineUp = (duration: BaseDuration) => {
  switch (duration) {
    case "1n":
    case "1n.":
      return false;
    default:
      return true;
  }
};

const shouldFillInCircle = (duration: BaseDuration) => {
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

const shouldAddEigthLine = (duration: BaseDuration) => {
  switch (duration) {
    case "16n":
    case "8n":
    case "8n.":
      return true;
    default:
      return false;
  }
};

const shouldAddSixteenthLine = (duration: BaseDuration) => {
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
        ry={rootCircleYRadius}
        stroke={strokeColor}
        opacity={opacity}
        fillOpacity={fillOpacity}
        strokeWidth="3"
        fill={fillColor}
      />
    </g>
  );
};

interface NoteShapePathProps extends BaseSVGPathProps {
  duration: BaseDuration;
  baseXPosition: number;
  baseYPosition: number;
  staccato?: boolean;
}

export const NoteShapePath = ({
  duration,
  handleClick,
  color,
  opacity = 1,
  baseXPosition,
  baseYPosition,
  staccato,
}: NoteShapePathProps) => {
  return (
    <g className={handleClick ? "clickable-svg" : ""} onClick={handleClick}>
      {drawLineUp(duration) && (
        <UpStroke
          xStart={getUpStrokeXStart(baseXPosition)}
          yStart={baseYPosition}
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
      {shouldAddDurationDot(duration) && (
        <Dot
          xCentre={getDurationDotXCentre(baseXPosition)}
          yCentre={baseYPosition}
          color={color}
          opacity={opacity}
        />
      )}
      {staccato && (
        <Dot
          xCentre={getRootCircleCX(baseXPosition)}
          yCentre={baseYPosition + staccatoDisplacement}
          color={color}
          opacity={opacity}
        />
      )}
      {shouldAddEigthLine(duration) && (
        <EigthOrSixteenthLine
          yStart={getEigthLineYStart(baseYPosition)}
          xStart={getEigthLineXStart(baseXPosition)}
          color={color}
          opacity={opacity}
        />
      )}
      {shouldAddSixteenthLine(duration) && (
        <EigthOrSixteenthLine
          yStart={getSixteenthLineYStart(baseYPosition)}
          xStart={getSixteenthLineXStart(baseXPosition)}
          color={color}
          opacity={opacity}
        />
      )}
    </g>
  );
};
