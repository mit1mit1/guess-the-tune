import { durationNames, pitchNames } from "src/constants";
import { AnswerStatus, Duration, Note, NoteStatus, Pitch } from "src/types";
import { getHeight as getBaseYPosition } from "src/utils";
import { useStore } from "src/guessStore";
import "./SVGScore.css";

const SVGWidth = 3540;
const SVGHeight = 440;
const pitchGuessRadius = 28;
const clefLength = 400;
const incorrectPitchLength = 250;

const drawLineUp = (duration: Duration) => {
  switch (duration) {
    case "1n":
    case "1n.":
      return false;
    default:
      return true;
  }
};

const shouldFillInCircle = (duration: Duration) => {
  switch (duration) {
    case "2n":
    case "2n.":
    case "1n":
    case "1n.":
      return false;
    default:
      return true;
  }
};

const shouldAddDot = (duration: Duration) => {
  return duration.includes(".");
};

const shouldAddEigthLine = (duration: Duration) => {
  switch (duration) {
    case "16n":
    case "8n":
    case "8n.":
      return true;
    default:
      return false;
  }
};

const shouldAddSixteenthLine = (duration: Duration) => {
  if (duration === "16n") {
    return true;
  }
  return false;
};

const shouldAddSharp = (pitch: Pitch) => {
  return pitch.includes("#");
};

const distanceBetweenNotes = 280;

const StavePath = ({
  index,
  trackPitch,
}: {
  index: number;
  trackPitch: Pitch;
}) => {
  return (
    <path
      key={`${index}-${trackPitch}-stave-line`}
      strokeWidth="1"
      stroke="black"
      d={`M${
        clefLength + incorrectPitchLength + index * distanceBetweenNotes - 110
      } ${getBaseYPosition(trackPitch)} H ${
        clefLength + incorrectPitchLength + index * distanceBetweenNotes + 40
      }`}
    />
  );
};

interface ExtraStaveLinesProps {
  pitch: Pitch;
  index: number;
  startPitch: Pitch;
  increasing: Boolean;
}

const ExtraStaveLines = ({
  pitch,
  index,
  startPitch,
  increasing,
}: ExtraStaveLinesProps) => {
  let trackPitch = startPitch;
  const buffer = [];
  let hitEnd = false;
  let newIndex;
  const effectivePitch: Pitch = pitch.replace("#", "") as Pitch;
  const cScale = pitchNames.filter((pitch) => !pitch.includes("#"));
  while (
    cScale.indexOf(effectivePitch) <= cScale.indexOf(trackPitch) &&
    hitEnd === false
  ) {
    buffer.push(
      <StavePath
        index={index}
        trackPitch={trackPitch}
        key={`stave-extra-${trackPitch}`}
      />
    );
    newIndex = cScale.indexOf(trackPitch) + (increasing ? 1 : -1) * 2;
    if (newIndex < 0 || newIndex >= cScale.length) {
      hitEnd = true;
    } else {
      trackPitch = cScale[newIndex];
    }
  }
  return <>{buffer}</>;
};

interface MiniSharpProps {
  pitch: Pitch;
  color: string;
  opacity?: number;
  xStart: number;
}

interface NoteSubpartProps {
  pitch: Pitch;
  color: string;
  opacity?: number;
  index: number;
}

const SharpPath = ({
  xStart,
  yStart,
  color,
  opacity = 1,
  strokeWidth,
}: {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
  strokeWidth: number;
}) => {
  return (
    <>
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 60} ${yStart + 20} H ${xStart}`}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 60} ${yStart + 40} H ${xStart}`}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 40} ${yStart} V ${yStart + 60}`}
      />
      <path
        strokeWidth={strokeWidth}
        stroke={color}
        opacity={opacity}
        d={`M${xStart + 20} ${yStart} V ${yStart + 60}`}
      />
    </>
  );
};

const Sharp = ({ pitch, color, opacity = 1, index }: NoteSubpartProps) => {
  const xStart =
    clefLength + incorrectPitchLength + index * distanceBetweenNotes - 150;
  const yStart = getBaseYPosition(pitch) - 32;
  return (
    <SharpPath
      xStart={xStart}
      yStart={yStart}
      color={color}
      opacity={opacity}
      strokeWidth={12}
    />
  );
};

const getMiniSharpXStart = (index: number) => {
  return clefLength + incorrectPitchLength + index * distanceBetweenNotes - 150;
};

const MiniSharp = ({ pitch, color, opacity, xStart }: MiniSharpProps) => {
  const yStart = getBaseYPosition(pitch) - 32;
  return (
    <SharpPath
      xStart={xStart}
      yStart={yStart}
      color={color}
      opacity={opacity}
      strokeWidth={5}
    />
  );
};

const getDotXCentre = (baseXPosition: number) => {
  return baseXPosition + 19;
};

interface DotProps {
  color: string;
  opacity?: number;
  xCentre: number;
  yCentre: number;
}

const Dot = ({ color, opacity, xCentre, yCentre }: DotProps) => {
  return (
    <circle
      cx={xCentre}
      cy={yCentre}
      r="5"
      stroke={color}
      opacity={opacity}
      strokeWidth="3"
      fill={color}
    />
  );
};

const getUpStrokeXStart = (baseXPosition: number) => {
  return baseXPosition + 2;
};

interface UpStrokeProps {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
}

const UpStroke = ({ xStart, yStart, color, opacity }: UpStrokeProps) => {
  return (
    <path
      strokeWidth="4"
      stroke={color}
      opacity={opacity}
      d={`M${xStart} ${yStart} V ${yStart + 200}`}
    />
  );
};

const getEigthLineXStart = (baseXPosition: number) => {
  return baseXPosition + 2;
};

const getEigthLineYStart = (baseYPosition: number) => {
  return baseYPosition - 200 + 8;
};

interface EigthLineProps {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
}

const EigthLine = ({ xStart, yStart, color, opacity }: EigthLineProps) => {
  return (
    <path
      strokeWidth="16"
      stroke={color}
      opacity={opacity}
      d={`M${xStart} ${yStart} H ${xStart + 80}`}
    />
  );
};

const getSixteenthLineXStart = (baseXPosition: number) => {
  return baseXPosition + 2;
};

const getSixteenthLineYStart = (baseYPosition: number) => {
  return baseYPosition - 200 + 8 + 30;
};

interface SixteenthLineProps {
  xStart: number;
  yStart: number;
  color: string;
  opacity?: number;
}

const SixteenthLine = ({
  xStart,
  yStart,
  color,
  opacity,
}: SixteenthLineProps) => {
  return (
    <path
      strokeWidth="16"
      stroke={color}
      opacity={opacity}
      d={`M${xStart} ${yStart} H ${xStart + 80}`}
    />
  );
};

const getBaseXPosition = (index: number) => {
  return clefLength + incorrectPitchLength + index * distanceBetweenNotes;
};

const getRootCircleCX = (baseXPosition: number) => {
  return baseXPosition - 38;
};

interface RootCircleProps {
  opacity?: number;
  handleClick?: () => void;
  strokeColor: string;
  fillColor: string;
  xCentre: number;
  yCentre: number;
}

const RootCircle = ({
  handleClick,
  strokeColor,
  fillColor,
  opacity = 1,
  xCentre,
  yCentre,
}: RootCircleProps) => {
  return (
    <circle
      onClick={handleClick}
      cx={xCentre}
      cy={yCentre}
      r="36"
      stroke={strokeColor}
      opacity={opacity}
      strokeWidth="3"
      fill={fillColor}
    />
  );
};

interface NoteShapePathProps {
  opacity?: number;
  duration: Duration;
  baseXPosition: number;
  baseYPosition: number;
  handleClick?: () => void;
  color: string;
}

const NoteShapePath = ({
  duration,
  handleClick,
  color,
  opacity = 1,
  baseXPosition,
  baseYPosition,
}: NoteShapePathProps) => {
  return (
    <>
      {drawLineUp(duration) && (
        <UpStroke
          xStart={getUpStrokeXStart(baseXPosition)}
          yStart={baseYPosition - 200}
          color={color}
          opacity={opacity}
        />
      )}
      <RootCircle
        xCentre={getRootCircleCX(baseXPosition)}
        yCentre={baseYPosition}
        handleClick={handleClick}
        strokeColor={color}
        fillColor={shouldFillInCircle(duration) ? color : "white"}
        opacity={opacity}
      />
      {shouldAddDot(duration) && (
        <Dot
          xCentre={getDotXCentre(baseXPosition)}
          yCentre={baseYPosition}
          color={color}
          opacity={opacity}
        />
      )}
      {shouldAddEigthLine(duration) && (
        <EigthLine
          yStart={getEigthLineYStart(baseYPosition)}
          xStart={getEigthLineXStart(baseXPosition)}
          color={color}
          opacity={opacity}
        />
      )}
      {shouldAddSixteenthLine(duration) && (
        <SixteenthLine
          yStart={getSixteenthLineYStart(baseYPosition)}
          xStart={getSixteenthLineXStart(baseXPosition)}
          color={color}
          opacity={opacity}
        />
      )}
    </>
  );
};

interface NotePathProps {
  opacity?: number;
  note: Note;
  index: number;
  color: string;
}

const NotePath = ({ note, index, color, opacity = 1 }: NotePathProps) => {
  const baseXPosition = getBaseXPosition(index);
  const baseYPosition = getBaseYPosition(note.pitch);
  const { setSelectedNote } = useStore((state) => state);
  const handleClick = () => setSelectedNote(index);

  return (
    <>
      <NoteShapePath
        duration={note.duration}
        baseXPosition={baseXPosition}
        baseYPosition={baseYPosition}
        handleClick={handleClick}
        color={color}
        opacity={opacity}
      />
      {shouldAddSharp(note.pitch) && (
        <Sharp
          pitch={note.pitch}
          index={index}
          color={color}
          opacity={opacity}
        />
      )}
      {/* <ExtraStaveLines pitch={note.pitch} startPitch="A5" increasing index={index} /> */}
      <ExtraStaveLines
        pitch={note.pitch}
        startPitch="C4"
        increasing={false}
        index={index}
      />
    </>
  );
};

interface DurationGuessPathProps {
  duration: Duration;
  positionIndex: number;
  color: string;
  opacity?: number;
}

const CorrectDurationGuessPath = ({
  duration,
  positionIndex,
  color,
  opacity,
}: DurationGuessPathProps) => {
  const baseXPosition = getBaseXPosition(positionIndex);
  return (
    <NoteShapePath
      duration={duration}
      baseXPosition={baseXPosition}
      baseYPosition={-50}
      color={color}
      opacity={opacity}
    />
  );
};

const IncorrectDurationGuessPath = ({
  duration,
  positionIndex,
  color,
  opacity,
}: DurationGuessPathProps) => {
  const baseXPosition = getBaseXPosition(positionIndex);
  return (
    <NoteShapePath
      duration={duration}
      baseXPosition={
        baseXPosition - 50 + 100 * (durationNames.indexOf(duration) % 2)
      }
      baseYPosition={
        SVGHeight + 50 + durationNames.indexOf(duration) * 230 * 0.5
      }
      color={color}
      opacity={opacity}
    />
  );
};

interface PitchGuessPathProps {
  pitch: Pitch;
  positionIndex: number;
  color: string;
  opacity?: number;
}

const PitchGuessPath = ({
  pitch,
  positionIndex,
  color,
  opacity = 1,
}: PitchGuessPathProps) => {
  const { setSelectedNote } = useStore((state) => state);
  return (
    <>
      {shouldAddSharp(pitch) && (
        <MiniSharp
          pitch={pitch}
          xStart={getMiniSharpXStart(positionIndex)}
          color={color}
          opacity={opacity}
        />
      )}
      <circle
        onClick={() => setSelectedNote(positionIndex)}
        cx={
          clefLength +
          incorrectPitchLength +
          positionIndex * distanceBetweenNotes -
          38
        }
        cy={getBaseYPosition(pitch)}
        r={pitchGuessRadius}
        fill={color}
        opacity={opacity}
      />
    </>
  );
};

export const TrebleClef = () => {
  return (
    <path d="M289.859 218.165c-12.238-12.083-28.92-18.736-46.975-18.736-.739 0-1.469.011-2.191.034-4.751-18.989-9.194-34.531-12.219-44.64a758.83 758.83 0 0 1-3.54-12.192c13.877-15.22 26.345-29.841 33.266-44.593 19.623-41.823 10.708-66.709 3.647-77.821C253.684 7.369 240.237 0 224.955 0c-13.893 0-25.356 5.533-33.149 16-15.284 20.528-15.407 58.521-.127 118.479-29.22 31.773-60.724 67.762-60.724 112.562 0 47.333 25.917 70.548 47.66 81.688 22.534 11.546 45.015 12.242 45.961 12.266l.379.005c3.073 0 6.112-.127 9.109-.378l.103 1.491c1.335 19.236 2.489 35.849.003 50.352-2.37 13.822-11.714 18.001-19.006 17.382-3.07-.261-10.21-1.744-10.21-9.848h-30c0 21.169 15.841 37.883 37.666 39.74 1.33.113 2.656.17 3.98.17a46.432 46.432 0 0 0 27.914-9.306c10.179-7.647 16.827-19.082 19.225-33.069 3.095-18.055 1.826-36.334.356-57.5l-.317-4.583c-.043-.64-.088-1.279-.135-1.919 6.901-2.901 13.235-6.612 18.807-11.07 17.339-13.872 26.504-33.742 26.504-57.463.001-18.043-6.781-34.676-19.095-46.834zM215.868 33.916c1.515-2.034 3.663-3.916 9.086-3.916 3.451 0 8.261 1.094 11.573 6.307 2.361 3.716 8.945 18.232-5.486 48.989-3.165 6.746-8.459 14.108-14.908 21.894-10.675-50.874-4.268-67.898-.265-73.274zM225.237 311c-1.764-.087-18.08-1.109-33.732-9.38-20.557-10.862-30.55-28.715-30.55-54.579 0-27.928 19.13-54.306 40.316-78.423a1018.638 1018.638 0 0 1 10.722 39.708c-12.94 9.11-19.038 23.895-19.038 38.007 0 11.36 4.616 21.066 12.997 27.331 6.43 4.806 14.077 6.893 21.186 7.503a682.259 682.259 0 0 1 4.186 29.57 77.704 77.704 0 0 1-6.087.263zm35.152-9.649c-3.197-25.015-7.776-49.574-12.6-71.639 18.327 2.149 31.166 16.328 31.166 35.288 0 17.468-7.698 29.136-18.566 36.351z" />
  );
};

export const StaveLine = ({ pitch }: { pitch: Pitch }) => {
  return (
    <path
      strokeWidth="1"
      stroke="black"
      d={`M0 ${getBaseYPosition(pitch)} H ${SVGWidth - 1}`}
    />
  );
};

const TrebleStave = () => {
  return (
    <>
      <TrebleClef />
      <StaveLine pitch="E4" />
      <StaveLine pitch="G4" />
      <StaveLine pitch="B4" />
      <StaveLine pitch="D5" />
      <StaveLine pitch="F5" />
    </>
  );
};

const CurrentGuessPaths = ({ notes }: { notes: Array<Note> }) => {
  return (
    <>
      {notes.map((note, index) => {
        return (
          <NotePath
            note={note}
            index={index}
            color="black"
            key={`${index}-${note.pitch}-${note.duration}`}
          />
        );
      })}
    </>
  );
};

const NonIncorrectPaths = ({
  answerStatuses,
  answerNotes,
}: {
  answerStatuses: Array<NoteStatus>;
  answerNotes: Array<Note>;
}) => {
  return (
    <>
      {answerStatuses.map(({ pitchStatus, durationStatus }, index) => {
        if (
          pitchStatus === AnswerStatus.GUESSEDCORRECT &&
          durationStatus === AnswerStatus.GUESSEDCORRECT
        ) {
          return (
            <NotePath
              opacity={0.5}
              note={answerNotes[index]}
              index={index}
              color="green"
              key={`${index}-${answerNotes[index].pitch}-${answerNotes[index].duration}`}
            />
          );
        } else if (pitchStatus === AnswerStatus.GUESSEDCORRECT) {
          return (
            <PitchGuessPath
              pitch={answerNotes[index].pitch}
              positionIndex={index}
              color="green"
              key={`${index}-${answerNotes[index].pitch}-correct`}
            />
          );
        } else if (durationStatus === AnswerStatus.GUESSEDCORRECT) {
          return (
            <CorrectDurationGuessPath
              duration={answerNotes[index].duration}
              positionIndex={index}
              color="green"
              opacity={0.5}
              key={`${index}-${answerNotes[index].duration}-correct`}
            />
          );
        }
        return <></>;
      })}
    </>
  );
};

const IncorrectDurationPaths = ({
  incorrectDurations,
}: {
  incorrectDurations: Array<Array<Duration>>;
}) => {
  return (
    <>
      {incorrectDurations.map((durationArray, positionIndex) => {
        return durationArray.map((duration) => (
          <IncorrectDurationGuessPath
            duration={duration}
            positionIndex={positionIndex}
            color="grey"
            key={`${positionIndex}-${duration}`}
            opacity={0.5}
          />
        ));
      })}
    </>
  );
};

const IncorrectPitchPaths = ({
  incorrectPitches,
}: {
  incorrectPitches: Array<Array<Pitch>>;
}) => {
  return (
    <>
      {incorrectPitches.map((pitchArray, positionIndex) => {
        return pitchArray.map((pitch) => (
          <PitchGuessPath
            pitch={pitch}
            positionIndex={positionIndex}
            color="grey"
            key={`${positionIndex}-${pitch}`}
            opacity={0.5}
          />
        ));
      })}
    </>
  );
};

const getWrongSpotPitchXCentre = (pitch: Pitch) => {
  return clefLength + 50 + (pitchNames.indexOf(pitch) % 4) * 50;
};

const WrongSpotPitchPath = ({ pitch }: { pitch: Pitch }) => {
  const wrongSpotPitchColor = "yellow";
  return (
    <>
      {shouldAddSharp(pitch) && (
        <MiniSharp
          pitch={pitch}
          xStart={getWrongSpotPitchXCentre(pitch) - 50}
          color={wrongSpotPitchColor}
          opacity={1}
        />
      )}
      <circle
        cx={getWrongSpotPitchXCentre(pitch)}
        cy={getBaseYPosition(pitch)}
        r={pitchGuessRadius}
        fill={wrongSpotPitchColor}
      />
    </>
  );
};

const WrongSpotPitchPaths = ({
  wrongSpotPitches,
}: {
  wrongSpotPitches: Set<Pitch>;
}) => {
  const buffer: Array<JSX.Element> = [];
  wrongSpotPitches.forEach((pitch) => {
    buffer.push(<WrongSpotPitchPath pitch={pitch} />);
  });
  return <>{buffer}</>;
};

const getWrongSpotDurationXCentre = (duration: Duration) => {
  return 50 + 50 * (durationNames.indexOf(duration) % 3) * 70;
};

const WrongSpotDurationPath = ({ duration }: { duration: Duration }) => {
  const wrongSpotDurationColor = "yellow";
  return (
    <NoteShapePath
      duration={duration}
      baseXPosition={getWrongSpotDurationXCentre(duration)}
      baseYPosition={
        SVGHeight + 50 + durationNames.indexOf(duration) * 230 * 0.4
      }
      color={wrongSpotDurationColor}
      opacity={0.5}
    />
  );
};

const WrongSpotDurationPaths = ({
  wrongSpotDurations,
}: {
  wrongSpotDurations: Set<Duration>;
}) => {
  const buffer: Array<JSX.Element> = [];
  wrongSpotDurations.forEach((duration) => {
    buffer.push(<WrongSpotDurationPath duration={duration} />);
  });
  return <>{buffer}</>;
};

interface SVGScoreProps {
  incorrectPitches: Array<Array<Pitch>>;
  incorrectDurations: Array<Array<Duration>>;
  answerStatuses: Array<NoteStatus>;
  answerNotes: Array<Note>;
  wrongSpotPitches: Set<Pitch>;
  wrongSpotDurations: Set<Duration>;
}

export const SVGScore = ({
  incorrectPitches,
  incorrectDurations,
  answerStatuses,
  answerNotes,
  wrongSpotPitches,
  wrongSpotDurations,
}: SVGScoreProps) => {
  const { guesses } = useStore((state) => state);
  return (
    <svg
      viewBox={`0 0 ${SVGWidth} ${
        SVGHeight + 0.5 * 200 * durationNames.length
      }`}
      xmlns="<http://www.w3.org/2000/svg>"
      className="svg-score"
    >
      <TrebleStave />
      <CurrentGuessPaths notes={guesses} />
      <WrongSpotPitchPaths wrongSpotPitches={wrongSpotPitches} />
      <WrongSpotDurationPaths wrongSpotDurations={wrongSpotDurations} />
      <NonIncorrectPaths
        answerStatuses={answerStatuses}
        answerNotes={answerNotes}
      />
      <IncorrectPitchPaths incorrectPitches={incorrectPitches} />
      <IncorrectDurationPaths incorrectDurations={incorrectDurations} />
    </svg>
  );
};
