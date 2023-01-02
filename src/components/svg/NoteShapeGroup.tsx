import { maxNoteXLength, UpStrokeLength } from "src/constants/svg";
import { BaseDuration, BaseSVGPathProps } from "src/types";
import { NoteShapePath } from "./NoteShapePath";
import svgStyles from "src/components/svg/SVGScore.module.scss";
import { getRestYCentre, RestShapePath } from "./RestShapePath";
import {
  getBaseYPosition,
  getDurationDotXCentre,
  getTripletCX,
  shouldAddDurationDot,
  shouldAddTripletSymbol,
} from "src/utils/score";
import { Dot } from "./Dot";
import { TripletSymbol } from "./TripletSymbol";

interface TiePathProps {
  opacity?: number;

  handleClick?: () => void;
  color: string;
  xStart: number;
  yStart: number;
  xEnd: number;
  yEnd: number;
}

const TiePath = ({
  xStart,
  yStart,
  xEnd,
  yEnd,
  color,
  opacity,
  handleClick,
}: TiePathProps) => {
  return (
    <path
      stroke={color}
      strokeWidth={8}
      opacity={opacity}
      onClick={handleClick}
      d={`M ${xStart} ${yStart} A 50 10 0 0 1 ${xEnd} ${yEnd}`}
    />
  );
};

interface NoteShapeGroupProps extends BaseSVGPathProps {
  durations: Array<BaseDuration>;
  baseXPosition: number;
  baseYPosition: number;
  staccato?: boolean;
  rest?: boolean;
}

export const NoteShapeGroup = ({
  durations,
  handleClick,
  color,
  opacity = 1,
  baseXPosition,
  baseYPosition,
  staccato,
  rest,
}: NoteShapeGroupProps) => {
  const buffer: Array<JSX.Element> = [];
  let groupCounter = 0;
  let index = 0;
  for (let i = 0; i < durations.length; i++) {
    let baseDuration = durations[i];
    if (index > 0 && !rest) {
      buffer.push(
        <TiePath
          handleClick={handleClick}
          key={`tie-path-${index}-`}
          color={color}
          opacity={opacity}
          xStart={baseXPosition + (groupCounter - 1) * maxNoteXLength}
          yStart={baseYPosition + UpStrokeLength * 1.2}
          xEnd={baseXPosition + groupCounter * maxNoteXLength}
          yEnd={baseYPosition + UpStrokeLength * 1.2}
        />
      );
    }
    if (rest) {
      if (shouldAddDurationDot(baseDuration as BaseDuration)) {
        buffer.push(
          <Dot
            xCentre={getDurationDotXCentre(baseXPosition)}
            yCentre={getBaseYPosition("B4")}
            color={color}
            opacity={opacity}
            handleClick={handleClick}
          />
        );
      }
      if (shouldAddTripletSymbol(baseDuration as BaseDuration)) {
        buffer.push(
          <TripletSymbol
            xCentre={getTripletCX(baseXPosition)}
            yCentre={
              getRestYCentre(baseDuration as BaseDuration) + UpStrokeLength
            }
            color={color}
            opacity={opacity}
          />
        );
      }
      buffer.push(
        <RestShapePath
          key={`rest-shape-path-${index}-${i}`}
          baseDuration={baseDuration as BaseDuration}
          handleClick={handleClick}
          color={color}
          opacity={opacity}
          baseXPosition={baseXPosition + groupCounter * maxNoteXLength}
        />
      );
    } else {
      buffer.push(
        <NoteShapePath
          key={`note-shape-path-${index}-${i}`}
          duration={baseDuration as BaseDuration}
          handleClick={handleClick}
          color={color}
          opacity={opacity}
          staccato={staccato}
          baseXPosition={baseXPosition + groupCounter * maxNoteXLength}
          baseYPosition={baseYPosition}
        />
      );
    }
    groupCounter++;
    index++;
  }
  return (
    <g
      className={handleClick ? svgStyles.clickableSVG : ""}
      onClick={handleClick}
    >
      {buffer}
    </g>
  );
};
