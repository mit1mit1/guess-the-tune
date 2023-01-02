import { BASE_COLOR, pitchNames } from "src/constants";
import { Pitch } from "src/types";
import { getBaseYPosition } from "src/utils/score";

const StavePath = ({
    baseXPosition,
    trackPitch,
}: {
    baseXPosition: number;
    trackPitch: Pitch;
}) => {
    return (
        <path
            key={`${baseXPosition}-${trackPitch}-stave-line`}
            strokeWidth="1"
            stroke={BASE_COLOR}
            d={`M${baseXPosition - 110} ${getBaseYPosition(trackPitch)} H ${baseXPosition + 40
                }`}
        />
    );
};

interface ExtraStaveLinesProps {
    pitch: Pitch;
    baseXPosition: number;
    startPitch: Pitch;
    increasing: Boolean;
}

export const ExtraStaveLines = ({
    pitch,
    baseXPosition,
    startPitch,
    increasing,
}: ExtraStaveLinesProps) => {
    let trackPitch = startPitch;
    const buffer = [];
    let hitEnd = false;
    let newIndex;
    const effectivePitch: Pitch = pitch.replace("#", "") as Pitch;
    const cScale = pitchNames.filter((pitch) => !pitch.includes("#"));
    const comparisonMultiplier = increasing ? 1 : -1;
    while (
        (cScale.indexOf(trackPitch) - cScale.indexOf(effectivePitch)) *
        comparisonMultiplier <=
        0 &&
        hitEnd === false
    ) {
        buffer.push(
            <StavePath
                baseXPosition={baseXPosition}
                trackPitch={trackPitch}
                key={`stave-extra-${trackPitch}`}
            />
        );
        newIndex = cScale.indexOf(trackPitch) + comparisonMultiplier * 2;
        if (newIndex < 0 || newIndex >= cScale.length) {
            hitEnd = true;
        } else {
            trackPitch = cScale[newIndex];
        }
    }
    return <>{buffer}</>;
};
