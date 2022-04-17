import { durationlessPitchRadius } from "src/constants/svg";
import { Pitch } from "src/types";
import { getBaseYPosition, shouldAddSharp } from "src/utils";
import { SharpPath } from "./SharpPath";

const sharpPathDisplacement = -80;
interface MiniSharpProps {
  pitch: Pitch;
  color: string;
  opacity?: number;
  xStart: number;
}

const MiniSharp = ({ pitch, color, opacity, xStart }: MiniSharpProps) => {
  const yStart = getBaseYPosition(pitch) - 32;
  return (
    <SharpPath
      xStart={xStart}
      yStart={yStart}
      color={color}
      opacity={opacity}
      strokeWidth={2}
    />
  );
};

interface DurationlessPitchPathProps {
  pitch: Pitch;
  xStart: number;
  color: string;
  opacity?: number;
  handleClick?: () => void;
}

export const DurationlessPitchPath = ({
  pitch,
  xStart,
  color,
  opacity = 1,
  handleClick,
}: DurationlessPitchPathProps) => {
  const yStart = getBaseYPosition(pitch) - durationlessPitchRadius;
  return (
    <>
      {shouldAddSharp(pitch) && (
        <MiniSharp
          pitch={pitch}
          xStart={xStart + sharpPathDisplacement}
          color={color}
          opacity={opacity}
        />
      )}
      <g
        transform={`rotate(45 ${xStart + durationlessPitchRadius} ${
          yStart + durationlessPitchRadius
        })`}
      >
        <rect
          onClick={handleClick}
          x={xStart}
          y={yStart}
          width={durationlessPitchRadius * 2}
          height={durationlessPitchRadius * 2}
          fill={color}
          opacity={opacity}
        />
      </g>
    </>
  );
};
