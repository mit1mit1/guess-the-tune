import { INCORRECT_COLOR } from "src/constants";
import { SVGHeight } from "src/constants/svg";
import { useStore } from "src/store/gameStore";
import { getRootCircleCX, getBaseYPosition, getBaseXPosition } from "src/utils/score";

export const SelectedNoteHighlight = ({
    startIndex,
    endIndex,
    staveIndex,
}: {
    startIndex: number;
    endIndex: number;
    staveIndex: number;
}) => {
    const { selectedNoteIndex } = useStore();
    if (selectedNoteIndex >= startIndex && selectedNoteIndex < endIndex) {
        return (
            <ellipse
                cx={getRootCircleCX(
                    getBaseXPosition(selectedNoteIndex - startIndex, staveIndex)
                )}
                cy={getBaseYPosition("B4")}
                rx={120}
                ry={(SVGHeight * 3) / 4}
                fill={INCORRECT_COLOR}
                opacity={0.2}
            />
        );
    }
    return <></>;
};