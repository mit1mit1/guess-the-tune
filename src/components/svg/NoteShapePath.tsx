import {
  eigthLineXLength,
  eigthLineYLength,
  rootCircleXRadius,
  rootCircleYRadius,
  staccatoDisplacement,
  UpStrokeLength,
} from "src/constants/svg";
import { BaseDuration, BaseSVGPathProps } from "src/types";
import {
  getDurationDotXCentre,
  getRootCircleCX,
  getTripletCX,
  shouldAddDurationDot,
  shouldAddTripletSymbol,
} from "src/utils";
import { Dot } from "./Dot";
import svgStyles from "src/components/svg/SVGScore.module.scss";
import { TripletSymbol } from "./TripletSymbol";

interface UpStrokeProps extends BaseSVGPathProps {
  xStart: number;
  yStart: number;
}

const UpStroke = ({
  xStart,
  yStart,
  color,
  opacity,
  handleClick,
}: UpStrokeProps) => {
  return (
    <>
      <path
        strokeWidth="4"
        stroke={color}
        opacity={opacity}
        d={`M${xStart} ${yStart} V ${yStart + UpStrokeLength}`}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
      />
      {handleClick && (
        <rect
          className={svgStyles.clickableCover}
          stroke=""
          opacity={0}
          x={xStart - 1.3 * rootCircleXRadius}
          y={yStart + UpStrokeLength - 15}
          width={30 + 2 * rootCircleXRadius}
          height={Math.abs(UpStrokeLength) + 30}
          onClick={handleClick}
        />
      )}
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

const EigthOrSixteenthLine = ({
  xStart,
  yStart,
  color,
  opacity,
  handleClick,
}: EigthLineProps) => {
  return (
    <>
      {handleClick && (
        <rect
          className={svgStyles.clickableCover}
          stroke=""
          opacity={0}
          x={xStart - 15}
          y={yStart + eigthLineYLength - 15}
          width={eigthLineXLength + 30}
          height={-eigthLineYLength + 30}
        />
      )}
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
    case "2t":
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
    case "16t":
    case "8t":
      return true;
    default:
      return false;
  }
};

const shouldAddSixteenthLine = (duration: BaseDuration) => {
  if (duration === "16n" || duration === "16t") {
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
    <g
      className={handleClick ? svgStyles.clickableSVG : ""}
      onClick={handleClick}
    >
      {drawLineUp(duration) && (
        <UpStroke
          xStart={getUpStrokeXStart(baseXPosition)}
          yStart={baseYPosition}
          color={color}
          opacity={opacity}
          handleClick={handleClick}
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
          handleClick={handleClick}
        />
      )}
      {shouldAddTripletSymbol(duration) && (
        <TripletSymbol
          xCentre={getTripletCX(baseXPosition)}
          yCentre={baseYPosition + UpStrokeLength}
          color={color}
          opacity={opacity}
          handleClick={handleClick}
        />
      )}
      {staccato && (
        <Dot
          xCentre={getRootCircleCX(baseXPosition)}
          yCentre={baseYPosition + staccatoDisplacement}
          color={color}
          opacity={opacity}
          handleClick={handleClick}
        />
      )}
      {shouldAddEigthLine(duration) && (
        <EigthOrSixteenthLine
          yStart={getEigthLineYStart(baseYPosition)}
          xStart={getEigthLineXStart(baseXPosition)}
          color={color}
          opacity={opacity}
          handleClick={handleClick}
        />
      )}
      {shouldAddSixteenthLine(duration) && (
        <EigthOrSixteenthLine
          yStart={getSixteenthLineYStart(baseYPosition)}
          xStart={getSixteenthLineXStart(baseXPosition)}
          color={color}
          opacity={opacity}
          handleClick={handleClick}
        />
      )}
    </g>
  );
};
