import { Pitch } from "src/types";
import {
  BASE_COLOR,
} from "src/constants/color";
import { initialAvailablePitches } from "src/store/constants";
import { useStore } from "src/store/gameStore";
import pitchKeyboardStyles from "./PitchKeyboard.module.scss";
import { TrebleStave } from "./svg/TrebleStave";
import { DurationlessPitchPath } from "./svg/DurationlessPitchPath";
import { noteSharpOffset } from "src/utils/score";
import { ExtraStaveLines } from "./svg/ExtraStaveLines";
import { durationlessPitchRadius } from "src/constants/svg";
import { FillDefs } from "./svg/FillDefs";

interface PitchKeyProps {
  pitch: Pitch;
  status?: "unknown" | "wrong-spot" | "unavailable";
}

const getKeyboardOffset = (pitch: Pitch) => {
  const multiplier = 200;
  return (
    multiplier * (0.5 + (initialAvailablePitches.indexOf(pitch) % 5)) +
    0.5 * noteSharpOffset(pitch)
  );
};

const PitchKey = ({ pitch, status = "unknown" }: PitchKeyProps) => {
  const { setSelectedGuessPitch } = useStore();
  let color = BASE_COLOR;
  if (status === "wrong-spot") {
    color = "url(#WRONG_SPOT_FILL)";
  } else if (status === "unavailable") {
    color = "url(#INCORRECT_PITCH_COLOR)";
  }
  const clickHandler =
    status === "unavailable" ? undefined : () => setSelectedGuessPitch(pitch);
  const offset = getKeyboardOffset(pitch);
  return (
    <>
      <ExtraStaveLines
        pitch={pitch}
        startPitch="A5"
        increasing
        baseXPosition={300 + offset + durationlessPitchRadius * 2}
      />
      <ExtraStaveLines
        pitch={pitch}
        startPitch="C4"
        increasing={false}
        baseXPosition={300 + offset + durationlessPitchRadius * 2}
      />
      <DurationlessPitchPath
        pitch={pitch}
        xStart={300 + offset}
        color={color}
        handleClick={clickHandler}
      /></>
  );
};

export const PitchKeyboard = () => {
  const { availablePitches, wrongSpotPitches } = useStore();
  return (
    <div className={pitchKeyboardStyles.pitchKeyboard}>
      <h1>Available Pitches</h1>
      <svg
        viewBox={`0 0 ${1350} ${540}`}
        xmlns="<http://www.w3.org/2000/svg>"
        className={pitchKeyboardStyles.pitchKeyboardSVG}
      >
        <FillDefs />
        <TrebleStave SVGWidth={1350} />
        {initialAvailablePitches.map((pitch, index) => {
          if (!availablePitches.includes(pitch)) {
            return (
              <PitchKey
                key={"pitch-key-" + index}
                pitch={pitch}
                status="unavailable"
              />
            );
          }
          if (wrongSpotPitches.has(pitch)) {
            return (
              <PitchKey
                key={"pitch-key-" + index}
                pitch={pitch}
                status="wrong-spot"
              />
            );
          }
          return <PitchKey key={"pitch-key-" + index} pitch={pitch} />;
        })}
      </svg>
    </div>
  );
};
