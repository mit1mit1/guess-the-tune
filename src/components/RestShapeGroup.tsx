import { maxNoteXLength, rootCircleXRadius, rootCircleYRadius } from "src/constants/svg";
import { BaseDuration, BaseSVGPathProps, Duration } from "src/types";
import { getBaseYPosition, getDurationDotXCentre, getRootCircleCX, shouldAddDurationDot } from "src/utils";
import { Dot } from "./Dot";

interface RestShapeGroupProps extends BaseSVGPathProps {
    durationObject: Duration;
    baseXPosition: number;
}

export const RestShapeGroup = ({
    durationObject,
    handleClick,
    color,
    opacity = 1,
    baseXPosition,
}: RestShapeGroupProps) => {
    const buffer: Array<JSX.Element> = [];
    let groupCounter = 0;
    let index = 0;
    for (const [baseDuration, multiplier] of Object.entries(durationObject)) {
        for (let n = 0; n < multiplier; n++) {
            buffer.push(
                <RestShapePath
                    key={`rest-shape-path-${index}-${n}`}
                    baseDuration={baseDuration as BaseDuration}
                    handleClick={handleClick}
                    color={color}
                    opacity={opacity}
                    baseXPosition={baseXPosition + groupCounter * maxNoteXLength}
                />
            );
            if (shouldAddDurationDot(baseDuration as BaseDuration)) {
                buffer.push(<Dot
                    xCentre={getDurationDotXCentre(baseXPosition)}
                    yCentre={getRestYCentre(baseDuration as BaseDuration)}
                    color={color}
                    opacity={opacity}
                />)

            }
        }
        index++;
    }
    return (
        <g className={handleClick ? "clickable-svg" : ""} onClick={handleClick}>
            {buffer}
        </g>
    );
};

const barRestHeight = 0.7 * rootCircleXRadius;
const barRestLength = 2 * rootCircleYRadius;

const getRestYCentre = (baseDuration: BaseDuration) => {
    switch (baseDuration) {
        case "1n":
        case "1n.":
            return getBaseYPosition("D5") + 0.5 * barRestHeight;
        case "2n":
        case "2n.":
            return getBaseYPosition("B4") - 0.5 * barRestHeight;
        default:
            return getBaseYPosition("B4");
    }
}

interface RestShapePathProps extends BaseSVGPathProps {
    baseDuration: BaseDuration;
    baseXPosition: number;
}

const RestShapePath = ({ baseDuration, baseXPosition, color, opacity, handleClick }: RestShapePathProps) => {
    switch (baseDuration) {
        case "16n":
            return <SixteenthRest />
        case "8n":
        case "8n.":
            return <EigthRest />
        case "4n":
        case "4n.":
            return <QuarterRest />
        case "2n":
        case "2n.":
        case "1n":
        case "1n.":
            return <BarRest color={color} opacity={opacity} handleClick={handleClick} xCentre={getRootCircleCX(baseXPosition)} yCentre={getRestYCentre(baseDuration)} />
    }
}

const SixteenthRest = () => <path></path>
const QuarterRest = () => <div></div>
const EigthRest = () => <div></div>

interface BarRestProps extends BaseSVGPathProps {
    xCentre: number;
    yCentre: number
}

const BarRest = ({ handleClick, color, opacity, xCentre, yCentre }: BarRestProps) => {
    return <>
        <path
            strokeWidth={barRestHeight}
            stroke={color}
            opacity={opacity}
            d={`M${xCentre - 0.5 * barRestLength} ${yCentre} H ${xCentre + 0.5 * barRestLength}`}
            className={handleClick ? 'clickable-svg' : ''}
            onClick={handleClick}
        />
        {handleClick && <ellipse
            className="clickable-cover"
            stroke=""
            opacity={0}
            cx={xCentre}
            cy={yCentre}
            rx={0.5 * barRestLength + 8}
            ry={0.5 * barRestHeight + 8}
            onClick={handleClick}
        />}
    </>
}