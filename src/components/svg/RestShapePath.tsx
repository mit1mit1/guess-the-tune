import { rootCircleXRadius, rootCircleYRadius } from "src/constants/svg";
import { BaseDuration, BaseSVGPathProps } from "src/types";
import { getBaseYPosition, getRootCircleCX } from "src/utils/score";
import svgStyles from "src/components/svg/SVGScore.module.scss";

const quarterRestLength = rootCircleXRadius;
const eigthRestLength = 2 * rootCircleXRadius;
const barRestHeight = 0.7 * rootCircleXRadius;
const barRestLength = 2 * rootCircleYRadius;

export const getRestYCentre = (baseDuration: BaseDuration) => {
  switch (baseDuration) {
    case "1n":
    case "1n.":
      return getBaseYPosition("D5") + 0.5 * barRestHeight;
    case "2n":
    case "2n.":
    case "2t":
      return getBaseYPosition("B4") - 0.5 * barRestHeight;
    default:
      return getBaseYPosition("B4");
  }
};

interface RestShapePathProps extends BaseSVGPathProps {
  baseDuration: BaseDuration;
  baseXPosition: number;
}

export const RestShapePath = ({
  baseDuration,
  baseXPosition,
  color,
  opacity,
  handleClick,
}: RestShapePathProps) => {
  switch (baseDuration) {
    case "16n":
    case "16t":
    case "8n":
    case "8n.":
    case "8t":
      return (
        <EigthOrSixteenthRest
          color={color}
          opacity={opacity}
          handleClick={handleClick}
          xCentre={getRootCircleCX(baseXPosition)}
          isSixteenth={baseDuration.includes("16")}
        />
      );
    case "4n":
    case "4n.":
    case "4t":
      return (
        <QuarterRest
          color={color}
          opacity={opacity}
          handleClick={handleClick}
          xCentre={getRootCircleCX(baseXPosition)}
        />
      );
    case "2n":
    case "2n.":
    case "1n":
    case "1n.":
    case "2t":
      return (
        <BarRest
          color={color}
          opacity={opacity}
          handleClick={handleClick}
          xCentre={getRootCircleCX(baseXPosition)}
          yCentre={getRestYCentre(baseDuration)}
        />
      );
  }
};

interface QuarterRestProps extends BaseSVGPathProps {
  xCentre: number;
}

const QuarterRest = ({
  handleClick,
  color,
  opacity,
  xCentre,
}: QuarterRestProps) => {
  return (
    <>
      <line
        strokeWidth={8}
        stroke={color}
        opacity={opacity}
        x1={xCentre - quarterRestLength / 2}
        y1={getBaseYPosition("E5")}
        x2={xCentre + quarterRestLength / 2}
        y2={getBaseYPosition("C5")}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
      />
      <line
        strokeWidth={24}
        stroke={color}
        opacity={opacity}
        x1={xCentre + quarterRestLength / 2}
        y1={getBaseYPosition("C5")}
        x2={xCentre - quarterRestLength / 2}
        y2={getBaseYPosition("B4")}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
      />
      <line
        strokeWidth={8}
        stroke={color}
        opacity={opacity}
        x1={xCentre - quarterRestLength / 2}
        y1={getBaseYPosition("B4")}
        x2={xCentre + quarterRestLength / 2}
        y2={getBaseYPosition("G4")}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
      />

      <path
        strokeWidth={20}
        stroke={color}
        fill="none"
        opacity={opacity}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
        d={`M ${xCentre + quarterRestLength / 2} ${getBaseYPosition("G4")} A ${
          quarterRestLength / 2
        } ${quarterRestLength / 4} 10 0 0 ${xCentre} ${getBaseYPosition("F4")}`}
      />
    </>
  );
};
interface EigthOrSixteenthRestProps extends BaseSVGPathProps {
  xCentre: number;
  isSixteenth?: boolean;
}

const EigthOrSixteenthRest = ({
  handleClick,
  color,
  opacity,
  xCentre,
  isSixteenth,
}: EigthOrSixteenthRestProps) => {
  const lineXBottom = xCentre;
  const lineYBottom = getBaseYPosition("G4");
  const lineXTop = xCentre + eigthRestLength / 2;
  const lineYTop = getBaseYPosition("D5");
  const lineGradient = (lineYTop - lineYBottom) / (lineXTop - lineXBottom);
  const sixteenthProportionDown = 0.3;
  const sixteenthYDisplacement =
    -(lineXTop - lineXBottom) * sixteenthProportionDown * lineGradient;
  const sixteenthXDisplacement =
    -(lineXTop - lineXBottom) * sixteenthProportionDown;
  return (
    <>
      <line
        strokeWidth={5}
        stroke={color}
        opacity={opacity}
        x1={lineXBottom}
        y1={lineYBottom}
        x2={lineXTop}
        y2={lineYTop}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
      />
      <path
        strokeWidth={5}
        stroke={color}
        fill="none"
        opacity={opacity}
        className={handleClick ? svgStyles.clickableSVG : ""}
        onClick={handleClick}
        d={`M ${lineXTop} ${lineYTop} A ${eigthRestLength / 2} ${
          eigthRestLength / 8
        } -30 0 1 ${lineXTop - eigthRestLength} ${
          lineYTop + eigthRestLength / 2
        }`}
      />
      <circle
        cx={lineXTop - eigthRestLength}
        cy={lineYTop + eigthRestLength * 0.4}
        r={eigthRestLength / 6}
        stroke={color}
        opacity={opacity}
        strokeWidth="3"
        fill={color}
        onClick={handleClick}
      />
      {isSixteenth && (
        <>
          <path
            strokeWidth={5}
            stroke={color}
            fill="none"
            opacity={opacity}
            className={handleClick ? svgStyles.clickableSVG : ""}
            onClick={handleClick}
            d={`M ${lineXTop + sixteenthXDisplacement} ${
              lineYTop + sixteenthYDisplacement
            } A ${eigthRestLength / 2} ${eigthRestLength / 8} -30 0 1 ${
              lineXTop - eigthRestLength + sixteenthXDisplacement
            } ${lineYTop + eigthRestLength / 2 + sixteenthYDisplacement}`}
          />
          <circle
            cx={lineXTop - eigthRestLength + sixteenthXDisplacement}
            cy={lineYTop + eigthRestLength * 0.4 + sixteenthYDisplacement}
            r={eigthRestLength / 6}
            stroke={color}
            opacity={opacity}
            strokeWidth="3"
            fill={color}
            onClick={handleClick}
          />{" "}
        </>
      )}
      {handleClick && (
        <rect
          className={svgStyles.clickableCover}
          stroke=""
          opacity={0}
          x={xCentre - 0.25 * barRestLength - 8}
          cy={getBaseYPosition("B4") - 0.25 * barRestHeight - 8}
          width={barRestLength + 16}
          height={barRestHeight + 16}
          onClick={handleClick}
        />
      )}
    </>
  );
};

interface BarRestProps extends BaseSVGPathProps {
  xCentre: number;
  yCentre: number;
}

const BarRest = ({
  handleClick,
  color,
  opacity,
  xCentre,
  yCentre,
}: BarRestProps) => (
  <>
    <path
      strokeWidth={barRestHeight}
      stroke={color}
      opacity={opacity}
      d={`M${xCentre - 0.5 * barRestLength} ${yCentre} H ${
        xCentre + 0.5 * barRestLength
      }`}
      className={handleClick ? svgStyles.clickableSVG : ""}
      onClick={handleClick}
    />
    {handleClick && (
      <rect
        className={svgStyles.clickableCover}
        stroke=""
        opacity={0}
        x={xCentre - 0.5 * barRestLength - 8}
        y={yCentre - 0.5 * barRestHeight - 8}
        width={barRestLength + 16}
        height={barRestHeight + 16}
        onClick={handleClick}
      />
    )}
  </>
);
