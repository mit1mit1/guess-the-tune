import {
  BASE_COLOR,
  INCORRECT_COLOR,
  INCORRECT_PITCH_COLOR,
  pitchNames,
} from "src/constants";
import { AnswerStatus, Note, Pitch } from "src/types";
import { getBaseYPosition, getRootCircleCX, shouldAddSharp } from "src/utils";
import { useStore } from "src/gameStore";
import "./SVGScore.css";
import { TrebleStave } from "./TrebleStave";
import { SharpPath } from "./SharpPath";
import { DurationlessPitchPath } from "./DurationlessPitchPath";
import { durationlessPitchRadius, sharpYOffset } from "src/constants/svg";
import { NoteShapeGroup } from "src/components/NoteShapeGroup";
import { areIdentical } from "src/utils/game";

const SVGWidth = 3140;
const SVGHeight = 440;
const clefLength = 300;
const incorrectPitchLength = 250;

const noteSharpOffset = (pitch: Pitch) => {
  return 35 * (shouldAddSharp(pitch) ? -1 : 1);
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
      stroke={BASE_COLOR}
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

interface NoteSubpartProps {
  pitch: Pitch;
  color: string;
  opacity?: number;
  index: number;
}

const Sharp = ({ pitch, color, opacity = 1, index }: NoteSubpartProps) => {
  const xStart =
    clefLength +
    incorrectPitchLength +
    index * distanceBetweenNotes -
    150 +
    noteSharpOffset(pitch);
  const yStart = getBaseYPosition(pitch) + sharpYOffset;
  return (
    <SharpPath
      xStart={xStart}
      yStart={yStart}
      color={color}
      opacity={opacity}
      strokeWidth={6}
    />
  );
};

const getBaseXPosition = (index: number) => {
  return clefLength + incorrectPitchLength + index * distanceBetweenNotes;
};

interface NotePathProps {
  opacity?: number;
  note: Note;
  index: number;
  color: string;
}

const NotePath = ({ note, index, color, opacity = 1 }: NotePathProps) => {
  const baseXPosition = getBaseXPosition(index) + noteSharpOffset(note.pitch);
  const baseYPosition = getBaseYPosition(note.pitch);
  const { setSelectedNoteIndex } = useStore((state) => state);
  const handleClick = () => setSelectedNoteIndex(index);

  return (
    <>
      <NoteShapeGroup
        durationObject={note.durationObject}
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
  const { setSelectedNoteIndex } = useStore((state) => state);
  const xStart =
    clefLength +
    incorrectPitchLength +
    positionIndex * distanceBetweenNotes -
    38 +
    noteSharpOffset(pitch) -
    durationlessPitchRadius;
  return (
    <DurationlessPitchPath
      pitch={pitch}
      xStart={xStart}
      handleClick={() => setSelectedNoteIndex(positionIndex)}
      color={color}
      opacity={opacity}
    />
  );
};

const CurrentGuessPaths = ({
  notes,
  correctNotes,
  startIndex,
  endIndex,
}: {
  notes: Array<Note>;
  correctNotes: Array<Note>;
  startIndex: number;
  endIndex: number;
}) => {
  const { incorrectDurationsArrays, answerStatuses } = useStore(
    (state) => state
  );
  const displayNotes = notes.slice(startIndex, endIndex);

  return (
    <>
      {displayNotes.map((note, index) => {
        let color = BASE_COLOR;
        let opacity = 1;
        if (incorrectDurationsArrays[index].includes(note.durationObject)) {
          color = INCORRECT_COLOR;
        }
        if (
          answerStatuses[index].durationStatus ===
            AnswerStatus.GUESSEDCORRECT &&
          areIdentical(note.durationObject, correctNotes[index].durationObject)
        ) {
          opacity = 0.8;
          color = "green";
        }
        return (
          <NotePath
            note={note}
            index={index}
            color={color}
            opacity={opacity}
            key={`${index}-${note.pitch}-${note.durationObject}`}
          />
        );
      })}
    </>
  );
};

const NonIncorrectPaths = ({
  correctNotes,
  startIndex,
  endIndex,
}: {
  correctNotes: Array<Note>;
  startIndex: number;
  endIndex: number;
}) => {
  const { answerStatuses } = useStore((state) => state);
  return (
    <>
      {answerStatuses
        .slice(startIndex, endIndex)
        .map(({ pitchStatus, durationStatus }, index) => {
          if (
            pitchStatus === AnswerStatus.GUESSEDCORRECT &&
            durationStatus === AnswerStatus.GUESSEDCORRECT
          ) {
            return (
              <g key={"non-incorrect-path-" + index}>
                <PitchGuessPath
                  pitch={correctNotes[index].pitch}
                  positionIndex={index}
                  color="green"
                  key={`${index}-${correctNotes[index].pitch}-correct`}
                />
                <NotePath
                  opacity={0.5}
                  note={correctNotes[index]}
                  index={index}
                  color="green"
                  key={`${index}-${correctNotes[index].pitch}-${correctNotes[index].durationObject}`}
                />
              </g>
            );
          } else if (pitchStatus === AnswerStatus.GUESSEDCORRECT) {
            return (
              <PitchGuessPath
                pitch={correctNotes[index].pitch}
                positionIndex={index}
                color="green"
                key={`${index}-${correctNotes[index].pitch}-correct`}
              />
            );
          }
          return <g key={"non-incorrect-path-" + index}></g>;
        })}
    </>
  );
};

const IncorrectPitchPaths = ({
  startIndex,
  endIndex,
}: {
  startIndex: number;
  endIndex: number;
}) => {
  const { incorrectPitchesArrays } = useStore((state) => state);
  return (
    <>
      {incorrectPitchesArrays
        .slice(startIndex, endIndex)
        .map((pitchArray, positionIndex) => {
          return pitchArray.map((pitch) => (
            <PitchGuessPath
              pitch={pitch}
              positionIndex={positionIndex}
              color={INCORRECT_PITCH_COLOR}
              key={`${positionIndex}-${pitch}`}
              opacity={1}
            />
          ));
        })}
    </>
  );
};

const SelectedNoteHighlight = ({
  startIndex,
  endIndex,
}: {
  startIndex: number;
  endIndex: number;
}) => {
  const { selectedNoteIndex } = useStore((state) => state);
  if (selectedNoteIndex >= startIndex && selectedNoteIndex < endIndex) {
    return (
      <ellipse
        cx={getRootCircleCX(getBaseXPosition(selectedNoteIndex - startIndex))}
        cy={getBaseYPosition("B4")}
        rx={120}
        ry={SVGHeight}
        fill={INCORRECT_COLOR}
        opacity={0.2}
      />
    );
  }
  return <></>;
};

export const SVGScore = ({ correctNotes }: { correctNotes: Array<Note> }) => {
  const { guesses } = useStore((state) => state);
  const songLength = correctNotes.length;
  const buffer = [];
  const notesPerLine = 5;
  for (let i = 0; i < songLength; i = i + notesPerLine) {
    const startIndex = i;
    const endIndex = Math.min(i + notesPerLine, songLength);
    buffer.push(
      <svg
        viewBox={`0 0 ${SVGWidth} ${SVGHeight}`}
        xmlns="<http://www.w3.org/2000/svg>"
        className="svg-score"
      >
        <TrebleStave SVGWidth={SVGWidth} />
        <SelectedNoteHighlight startIndex={startIndex} endIndex={endIndex} />
        <CurrentGuessPaths
          notes={guesses}
          correctNotes={correctNotes}
          startIndex={startIndex}
          endIndex={endIndex}
        />
        <NonIncorrectPaths
          correctNotes={correctNotes}
          startIndex={startIndex}
          endIndex={endIndex}
        />
        <IncorrectPitchPaths startIndex={startIndex} endIndex={endIndex} />
      </svg>
    );
  }
  return <>{buffer}</>;
};
