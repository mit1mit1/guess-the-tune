import { CORRECT_COLOR, CORRECT_PITCH_COLOR, INCORRECT_COLOR, INCORRECT_PITCH_COLOR, WRONG_SPOT_COLOR } from "src/constants/color";

export const FillDefs = () => (
    <defs>
        <pattern id="CORRECT_PITCH_FILL" height="18" width="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="8" fill={CORRECT_PITCH_COLOR} />
        </pattern>
        <pattern id="INCORRECT_PITCH_FILL" height="10" width="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="10" y2="0" strokeWidth="12" stroke={INCORRECT_PITCH_COLOR} />
        </pattern>
        <pattern id="CORRECT_FILL" height="18" width="18" patternUnits="userSpaceOnUse">
            <ellipse cx="9" cy="9" rx="6" ry="8" fill={CORRECT_COLOR} />
        </pattern>
        <pattern id="INCORRECT_FILL" height="10" width="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="10" y2="0" strokeWidth="5" stroke={INCORRECT_COLOR} />
        </pattern>
        <pattern id="WRONG_SPOT_FILL" height="18" width="18" patternUnits="userSpaceOnUse">
            <rect x1="5" y1="5" width="8" height={8} strokeWidth="5" stroke={WRONG_SPOT_COLOR} />
        </pattern>
    </defs>
)