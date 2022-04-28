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
import { durationlessPitchRadius, maxNoteXLength, sharpYOffset } from "src/constants/svg";
import { NoteShapeGroup } from "src/components/NoteShapeGroup";
import { areIdentical } from "src/utils/game";

const SVGWidth = 3140;
const SVGHeight = 440;
const clefLength = 300;
const incorrectPitchLength = 250;

const noteSharpOffset = (pitch: Pitch) => {
  return 35 * (shouldAddSharp(pitch) ? -1 : 1);
};

const distanceBetweenNotes = 3 * maxNoteXLength;

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
  displayIndex: number;
  startPitch: Pitch;
  increasing: Boolean;
}

const ExtraStaveLines = ({
  pitch,
  displayIndex,
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
        index={displayIndex}
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
  displayIndex: number;
  handleClick: () => void;
}

const Sharp = ({ pitch, color, opacity = 1, displayIndex, handleClick }: NoteSubpartProps) => {
  const xStart =
    clefLength +
    incorrectPitchLength +
    displayIndex * distanceBetweenNotes -
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
      handleClick={handleClick}
    />
  );
};

const getBaseXPosition = (index: number) => {
  return clefLength + incorrectPitchLength + index * distanceBetweenNotes;
};

interface NotePathProps {
  opacity?: number;
  note: Note;
  displayIndex: number;
  trueIndex: number;
  color: string;
}

const NotePath = ({ note, displayIndex, trueIndex, color, opacity = 1 }: NotePathProps) => {
  const baseXPosition = getBaseXPosition(displayIndex) + noteSharpOffset(note.pitch);
  const baseYPosition = getBaseYPosition(note.pitch);
  const { setSelectedNoteIndex } = useStore((state) => state);
  const handleClick = () => setSelectedNoteIndex(trueIndex);

  return (
    <>
      <NoteShapeGroup
        durationObject={note.durationObject}
        baseXPosition={baseXPosition}
        baseYPosition={baseYPosition}
        handleClick={handleClick}
        color={color}
        opacity={opacity}
        staccato={note.staccato}
      />
      {shouldAddSharp(note.pitch) && (
        <Sharp
          pitch={note.pitch}
          displayIndex={displayIndex}
          handleClick={handleClick}
          color={color}
          opacity={opacity}
        />
      )}
      {/* <ExtraStaveLines pitch={note.pitch} startPitch="A5" increasing index={index} /> */}
      <ExtraStaveLines
        pitch={note.pitch}
        startPitch="C4"
        increasing={false}
        displayIndex={displayIndex}
      />
    </>
  );
};

interface PitchGuessPathProps {
  pitch: Pitch;
  positionIndex: number;
  trueIndex: number;
  color: string;
  opacity?: number;
}

const PitchGuessPath = ({
  pitch,
  positionIndex,
  trueIndex,
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
      handleClick={() => setSelectedNoteIndex(trueIndex)}
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
      {displayNotes.map((note, displayIndex) => {
        let trueIndex = displayIndex + startIndex;
        let color = BASE_COLOR;
        let opacity = 1;
        if (incorrectDurationsArrays[trueIndex].includes(note.durationObject)) {
          color = INCORRECT_COLOR;
        }
        if (
          answerStatuses[trueIndex].durationStatus ===
            AnswerStatus.GUESSEDCORRECT &&
          areIdentical(note.durationObject, correctNotes[trueIndex].durationObject)
        ) {
          opacity = 0.8;
          color = "green";
        }
        return (
          <NotePath
            note={note}
            displayIndex={displayIndex}
            trueIndex={trueIndex}
            color={color}
            opacity={opacity}
            key={`${trueIndex}-${note.pitch}-${note.durationObject}`}
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
        .map(({ pitchStatus, durationStatus }, displayIndex) => {
          let trueIndex = startIndex + displayIndex;
          if (
            pitchStatus === AnswerStatus.GUESSEDCORRECT &&
            durationStatus === AnswerStatus.GUESSEDCORRECT
          ) {
            return (
              <g key={"non-incorrect-path-" + trueIndex}>
                <PitchGuessPath
                  pitch={correctNotes[trueIndex].pitch}
                  positionIndex={displayIndex}
                  trueIndex={trueIndex}
                  color="green"
                  key={`${trueIndex}-${correctNotes[trueIndex].pitch}-non-incorrect`}
                />
                <NotePath
                  opacity={0.5}
                  note={correctNotes[trueIndex]}
                  displayIndex={displayIndex}
                  trueIndex={trueIndex}
                  color="green"
                  key={`${trueIndex}-full-correct-guess`}
                />
              </g>
            );
          } else if (pitchStatus === AnswerStatus.GUESSEDCORRECT) {
            return (
              <PitchGuessPath
                pitch={correctNotes[trueIndex].pitch}
                positionIndex={displayIndex}
                trueIndex={trueIndex}
                color="green"
                key={`${trueIndex}-pitch-correct`}
              />
            );
          }
          return <g key={"non-incorrect-path-" + trueIndex}></g>;
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
          let trueIndex = startIndex + positionIndex;
          return pitchArray.map((pitch) => (
            <PitchGuessPath
              pitch={pitch}
              positionIndex={positionIndex}
              trueIndex={trueIndex}
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
        ry={SVGHeight * 3/4}
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
        key={`score-svg-index-${i}`}
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
