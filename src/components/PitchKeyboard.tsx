import { Pitch } from "src/types";
import {
  BASE_COLOR,
  INCORRECT_PITCH_COLOR,
  WRONG_SPOT_COLOR,
} from "src/constants";
import { initialAvailablePitches, useStore } from "src/gameStore";
import pitchKeyboardStyles from "./PitchKeyboard.module.scss";
import { TrebleStave } from "./svg/TrebleStave";
import { DurationlessPitchPath } from "./svg/DurationlessPitchPath";
import { noteSharpOffset } from "src/utils";

interface PitchKeyProps {
  pitch: Pitch;
  status?: "unknown" | "wrong-spot" | "unavailable";
}

const getKeyboardOffset = (pitch: Pitch) => {
  const multiplier = 200;
  // switch (pitch) {
  //   case "E3":
  //   case "G3":
  //   case "B3":
  //   case "D4":
  //   case "F4":
  //   case "A4":
  //   case "C5":
  //   case "E5":
  //   case "G5":
  //   case "B5":
  //     return 3.7 * multiplier;
  //   case "G#3":
  //   case "D#4":
  //   case "F#4":
  //   case "A#4":
  //   case "C#5":
  //   case "G#5":
  //     return 1 * multiplier;
  //   case "F3":
  //   case "A3":
  //   case "C4":
  //   case "E4":
  //   case "G4":
  //   case "B4":
  //   case "D5":
  //   case "F5":
  //   case "A5":
  //     return 4.7 * multiplier;
  //   case "F#3":
  //   case "A#3":
  //   case "C#4":
  //   case "G#4":
  //   case "D#5":
  //   case "F#5":
  //   case "A#5":
  //     return 2.7 * multiplier;
  // }
  return (
    multiplier * (0.5 + (initialAvailablePitches.indexOf(pitch) % 5)) +
    0.5 * noteSharpOffset(pitch)
  );
};

const PitchKey = ({ pitch, status = "unknown" }: PitchKeyProps) => {
  const { setSelectedGuessPitch } = useStore();
  let color = BASE_COLOR;
  if (status === "wrong-spot") {
    color = WRONG_SPOT_COLOR;
  } else if (status === "unavailable") {
    color = INCORRECT_PITCH_COLOR;
  }
  const clickHandler =
    status === "unavailable" ? undefined : () => setSelectedGuessPitch(pitch);
  const offset = getKeyboardOffset(pitch);
  return (
    <DurationlessPitchPath
      pitch={pitch}
      xStart={300 + offset}
      color={color}
      handleClick={clickHandler}
    />
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
