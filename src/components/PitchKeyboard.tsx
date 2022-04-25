import { Pitch } from "src/types";
import { BASE_COLOR, pitchNames, WRONG_SPOT_COLOR } from "src/constants";
import { useStore } from "src/gameStore";
import "./PitchKeyboard.css";
import { TrebleStave } from "./TrebleStave";
import { DurationlessPitchPath } from "./DurationlessPitchPath";

interface PitchKeyProps {
  pitch: Pitch;
  status?: "unknown" | "wrong-spot" | "unavailable";
}

const getKeyboardOffset = (pitch: Pitch) => {
  const multiplier = 115;
  switch (pitch) {
    case "E3":
    case "G3":
    case "B3":
    case "D4":
    case "F4":
    case "A4":
    case "C5":
    case "E5":
    case "G5":
    case "B5":
      return 3.7 * multiplier;
    case "G#3":
    case "D#4":
    case "F#4":
    case "A#4":
    case "C#5":
    case "G#5":
      return 1 * multiplier;
    case "F3":
    case "A3":
    case "C4":
    case "E4":
    case "G4":
    case "B4":
    case "D5":
    case "F5":
    case "A5":
      return 4.7 * multiplier;
    case "F#3":
    case "A#3":
    case "C#4":
    case "G#4":
    case "D#5":
    case "F#5":
    case "A#5":
      return 2.7 * multiplier;
  }
};

const PitchKey = ({ pitch, status = "unknown" }: PitchKeyProps) => {
  const { setSelectedGuessPitch } = useStore((state) => state);
  let color = BASE_COLOR;
  if (status === "wrong-spot") {
    color = WRONG_SPOT_COLOR;
  }
  const offset = getKeyboardOffset(pitch);
  return (
    <DurationlessPitchPath
      pitch={pitch}
      xStart={300 + offset}
      color={color}
      handleClick={() => setSelectedGuessPitch(pitch)}
    />
  );
};

export const PitchKeyboard = () => {
  const { availablePitches, wrongSpotPitches } = useStore((state) => state);
  return (
    <div className="pitch-keyboard">
      <div>Available Pitches</div>
      <svg
        viewBox={`0 0 ${960} ${540}`}
        xmlns="<http://www.w3.org/2000/svg>"
        className="pitch-keyboard-svg"
      >
        <TrebleStave SVGWidth={960} />
        {pitchNames.map((pitch, index) => {
          if (!availablePitches.includes(pitch)) {
            return <g key={"pitch-key-" + index}></g>;
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
