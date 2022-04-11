import { Duration } from "src/types";
import { durationNames } from "src/constants";
import { useStore } from "src/guessStore";
import { NoteShapePath } from "./NoteShapePath";

interface DurationKeyProps {
  duration: Duration;
  status: "unknown" | "wrong-spot" | "unavailable";
}

const DurationKey = ({ duration, status }: DurationKeyProps) => {
  return (
    <>
      <svg>
        <NoteShapePath
          duration={duration}
          baseXPosition={50}
          baseYPosition={50}
          color="black"
        />
      </svg>
      <button>
        {duration} - {status}
      </button>
    </>
  );
};

export const DurationKeyboard = () => {
  const { availableDurations, wrongSpotDurations } = useStore((state) => state);

  const buffer: Array<JSX.Element> = [];

  durationNames.forEach((duration) => {
    if (!availableDurations.includes(duration)) {
      buffer.push(<DurationKey duration={duration} status="unavailable" />);
    } else if (wrongSpotDurations.has(duration)) {
      buffer.push(<DurationKey duration={duration} status="wrong-spot" />);
    } else {
      buffer.push(<DurationKey duration={duration} status="unknown" />);
    }
  });
  return <>{buffer}</>;
};
