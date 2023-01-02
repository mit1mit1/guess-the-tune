import { BASE_COLOR } from "src/constants";
import { clefLength, SVGHeight, timeSignatureWidth } from "src/constants/svg";
import { TimeSignature } from "src/types";
import { getBaseYPosition } from "src/utils/score";


const getNumerator = (timeSignature: TimeSignature) => {
    switch (timeSignature) {
        case TimeSignature.TWOTWO:
            return 2;
        case TimeSignature.THREEFOUR:
            return 3;
        case TimeSignature.FOURFOUR:
            return 4;
        case TimeSignature.FIVEFOUR:
            return 5;
    }
};

const getDenominator = (timeSignature: TimeSignature) => {
    switch (timeSignature) {
        case TimeSignature.THREEFOUR:
        case TimeSignature.FOURFOUR:
        case TimeSignature.FIVEFOUR:
            return 4;
        case TimeSignature.TWOTWO:
            return 2;
    }
};
export const TimeSignaturePath = ({ timeSignature }: { timeSignature: TimeSignature }) => {
    return (
        <>
            <text
                style={{ fontSize: `${SVGHeight * 0.47}px` }}
                x={clefLength + timeSignatureWidth}
                y={getBaseYPosition("B4")}
                fill={BASE_COLOR}
            >
                {getNumerator(timeSignature)}
            </text>
            <text
                style={{ fontSize: `${SVGHeight * 0.47}px` }}
                x={clefLength + timeSignatureWidth}
                y={getBaseYPosition("E4")}
                fill={BASE_COLOR}
            >
                {getDenominator(timeSignature)}
            </text>
        </>
    );
};
