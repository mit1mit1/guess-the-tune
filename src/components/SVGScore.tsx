import {
  BASE_COLOR,
  CORRECT_COLOR,
  INCORRECT_COLOR,
  INCORRECT_PITCH_COLOR,
  pitchNames,
} from "src/constants";
import {
  AnswerStatus,
  BaseSVGPathProps,
  Note,
  Pitch,
  TimeSignature,
} from "src/types";
import {
  getBaseYPosition,
  getRootCircleCX,
  noteSharpOffset,
  shouldAddSharp,
} from "src/utils";
import { useStore } from "src/gameStore";
import "./SVGScore.css";
import { TrebleStave } from "./TrebleStave";
import { SharpPath } from "./SharpPath";
import { DurationlessPitchPath } from "./DurationlessPitchPath";
import {
  durationlessPitchRadius,
  maxNoteXLength,
  sharpYOffset,
} from "src/constants/svg";
import { NoteShapeGroup } from "src/components/NoteShapeGroup";
import { areIdentical, isGuessable, unsharp } from "src/utils/game";
import { RestShapeGroup } from "./RestShapeGroup";

const SVGWidth = 3140;
const SVGHeight = 440;
const clefLength = 300;
const timeSignatureWidth = 80;
const incorrectPitchLength = 250;

const distanceBetweenNotes = 3 * maxNoteXLength;

const StavePath = ({
  baseXPosition,
  trackPitch,
}: {
  baseXPosition: number;
  trackPitch: Pitch;
}) => {
  return (
    <path
      key={`${baseXPosition}-${trackPitch}-stave-line`}
      strokeWidth="1"
      stroke={BASE_COLOR}
      d={`M${baseXPosition - 110} ${getBaseYPosition(trackPitch)} H ${
        baseXPosition + 40
      }`}
    />
  );
};

interface ExtraStaveLinesProps {
  pitch: Pitch;
  baseXPosition: number;
  startPitch: Pitch;
  increasing: Boolean;
}

const ExtraStaveLines = ({
  pitch,
  baseXPosition,
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
        baseXPosition={baseXPosition}
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

const getBaseXPosition = (noteIndex: number, staveIndex: number) => {
  return (
    clefLength +
    (staveIndex === 0 ? timeSignatureWidth * 3 : 0) +
    incorrectPitchLength +
    noteIndex * distanceBetweenNotes
  );
};

interface NotePathProps extends BaseSVGPathProps {
  note: Note;
  displayIndex: number;
  staveIndex: number;
}

const NotePath = ({
  note,
  displayIndex,
  color,
  opacity = 1,
  handleClick,
  staveIndex,
}: NotePathProps) => {
  const baseXPosition =
    getBaseXPosition(displayIndex, staveIndex) + noteSharpOffset(note.pitch);
  const baseYPosition = getBaseYPosition(note.pitch);

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
        <SharpPath
          xStart={baseXPosition - 150 + noteSharpOffset(note.pitch)}
          yStart={getBaseYPosition(note.pitch) + sharpYOffset}
          handleClick={handleClick}
          color={color}
          strokeWidth={6}
          opacity={opacity}
        />
      )}
      {/* <ExtraStaveLines pitch={note.pitch} startPitch="A5" increasing index={index} /> */}
      <ExtraStaveLines
        pitch={note.pitch}
        startPitch="C4"
        increasing={false}
        baseXPosition={baseXPosition}
      />
    </>
  );
};

interface PitchGuessPathProps extends BaseSVGPathProps {
  pitch: Pitch;
  positionIndex: number;
  staveIndex: number;
}

const PitchGuessPath = ({
  pitch,
  positionIndex,
  color,
  opacity = 1,
  handleClick,
  staveIndex,
}: PitchGuessPathProps) => {
  const xStart =
    getBaseXPosition(positionIndex, staveIndex) -
    38 +
    noteSharpOffset(pitch) -
    durationlessPitchRadius;
  return (
    <DurationlessPitchPath
      pitch={pitch}
      xStart={xStart}
      handleClick={handleClick}
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
  staveIndex,
}: {
  notes: Array<Note>;
  correctNotes: Array<Note>;
  startIndex: number;
  endIndex: number;
  staveIndex: number;
}) => {
  const { incorrectDurationsArrays, answerStatuses, setSelectedNoteIndex } =
    useStore();
  const displayNotes = notes.slice(startIndex, endIndex);

  return (
    <>
      {displayNotes.map((note, displayIndex) => {
        let trueIndex = displayIndex + startIndex;
        let color = BASE_COLOR;
        let opacity = 1;
        const handleClick = isGuessable(note)
          ? () => setSelectedNoteIndex(trueIndex)
          : undefined;
        if (incorrectDurationsArrays[trueIndex].includes(note.durationObject)) {
          color = INCORRECT_COLOR;
        }
        if (
          answerStatuses[trueIndex].durationStatus ===
            AnswerStatus.GUESSEDCORRECT &&
          areIdentical(
            note.durationObject,
            correctNotes[trueIndex].durationObject
          )
        ) {
          opacity = 0.8;
          color = CORRECT_COLOR;
        }
        if (
          answerStatuses[trueIndex].durationStatus ===
            AnswerStatus.UNGUESSABLE &&
          answerStatuses[trueIndex].pitchStatus === AnswerStatus.UNGUESSABLE
        ) {
          opacity = 1;
          color = CORRECT_COLOR;
        }
        if (!!note.rest) {
          return (
            <RestShapeGroup
              durationObject={note.durationObject}
              baseXPosition={
                getBaseXPosition(displayIndex, staveIndex) +
                noteSharpOffset(note.pitch)
              }
              color={color}
              opacity={opacity}
              key={`rest-${trueIndex}-${note.pitch}-${note.durationObject}`}
            />
          );
        }
        return (
          <NotePath
            note={note}
            displayIndex={displayIndex}
            color={color}
            opacity={opacity}
            key={`note-${trueIndex}-${note.pitch}-${note.durationObject}`}
            handleClick={handleClick}
            staveIndex={staveIndex}
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
  staveIndex,
}: {
  correctNotes: Array<Note>;
  startIndex: number;
  endIndex: number;
  staveIndex: number;
}) => {
  const { answerStatuses, setSelectedNoteIndex } = useStore();

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
                  color={CORRECT_COLOR}
                  key={`${trueIndex}-${correctNotes[trueIndex].pitch}-non-incorrect`}
                  handleClick={() => setSelectedNoteIndex(trueIndex)}
                  staveIndex={staveIndex}
                />
                <NotePath
                  opacity={0.5}
                  note={{
                    pitch: unsharp(correctNotes[trueIndex].pitch),
                    durationObject: correctNotes[trueIndex].durationObject,
                  }}
                  displayIndex={displayIndex}
                  handleClick={() => setSelectedNoteIndex(trueIndex)}
                  color={CORRECT_COLOR}
                  key={`${trueIndex}-full-correct-guess`}
                  staveIndex={staveIndex}
                />
              </g>
            );
          } else if (pitchStatus === AnswerStatus.GUESSEDCORRECT) {
            return (
              <PitchGuessPath
                pitch={correctNotes[trueIndex].pitch}
                positionIndex={displayIndex}
                color={CORRECT_COLOR}
                key={`${trueIndex}-pitch-correct`}
                handleClick={() => setSelectedNoteIndex(trueIndex)}
                staveIndex={staveIndex}
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
  staveIndex,
}: {
  startIndex: number;
  endIndex: number;
  staveIndex: number;
}) => {
  const { incorrectPitchesArrays, guesses, setSelectedNoteIndex } = useStore();
  return (
    <>
      {incorrectPitchesArrays
        .slice(startIndex, endIndex)
        .map((pitchArray, positionIndex) => {
          let trueIndex = startIndex + positionIndex;
          return pitchArray.map((pitch) => {
            if (pitch === guesses[trueIndex].pitch) {
              return (
                <PitchGuessPath
                  pitch={pitch}
                  positionIndex={positionIndex}
                  handleClick={() => setSelectedNoteIndex(trueIndex)}
                  color={INCORRECT_PITCH_COLOR}
                  key={`${positionIndex}-${pitch}`}
                  opacity={1}
                  staveIndex={staveIndex}
                />
              );
            }
            return <></>;
          });
        })}
    </>
  );
};

const SelectedNoteHighlight = ({
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

export const SVGScore = ({ correctNotes }: { correctNotes: Array<Note> }) => {
  const { guesses } = useStore();
  const songLength = correctNotes.length;
  const buffer = [];
  const notesPerLine = 5;
  let staveIndex = 0;
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
        {i === 0 && <TimeSignaturePath />}
        <SelectedNoteHighlight
          startIndex={startIndex}
          endIndex={endIndex}
          staveIndex={staveIndex}
        />
        <CurrentGuessPaths
          notes={guesses}
          correctNotes={correctNotes}
          startIndex={startIndex}
          endIndex={endIndex}
          staveIndex={staveIndex}
        />
        <NonIncorrectPaths
          correctNotes={correctNotes}
          startIndex={startIndex}
          endIndex={endIndex}
          staveIndex={staveIndex}
        />
        <IncorrectPitchPaths
          startIndex={startIndex}
          endIndex={endIndex}
          staveIndex={staveIndex}
        />
      </svg>
    );
    staveIndex++;
  }
  return <>{buffer}</>;
};

const getNumerator = (timeSignature: TimeSignature) => {
  switch (timeSignature) {
    case TimeSignature.THREEFOUR:
      return 3;
    case TimeSignature.FOURFOUR:
      return 4;
    case TimeSignature.FIVEFOUR:
      return 5;
  }
};

const getDenominator = (timeSignature: TimeSignature) => {
  switch (timeSignature) {
    case TimeSignature.FOURFOUR:
    case TimeSignature.FIVEFOUR:
      return 4;
  }
};

const TimeSignaturePath = () => {
  const { chosenSong } = useStore();
  return (
    <>
      <text
        style={{ fontSize: `${SVGHeight * 0.47}px` }}
        x={clefLength + timeSignatureWidth}
        y={getBaseYPosition("B4")}
        fill={BASE_COLOR}
      >
        {getNumerator(chosenSong.timeSignature)}
      </text>
      <text
        style={{ fontSize: `${SVGHeight * 0.47}px` }}
        x={clefLength + timeSignatureWidth}
        y={getBaseYPosition("E4")}
        fill={BASE_COLOR}
      >
        {getDenominator(chosenSong.timeSignature)}
      </text>
    </>
  );
};
