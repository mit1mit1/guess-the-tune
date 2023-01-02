import {
  BASE_COLOR,
  CORRECT_COLOR,
  CORRECT_PITCH_COLOR,
  INCORRECT_COLOR,
  INCORRECT_PITCH_COLOR,
} from "src/constants";
import {
  AnswerStatus,
  BaseSVGPathProps,
  Note,
  Pitch,
  TimeSignature,
} from "src/types";
import { useStore } from "src/store/gameStore";
import svgStyles from "./SVGScore.module.scss";
import { TrebleStave } from "./TrebleStave";
import { SharpPath } from "./SharpPath";
import { DurationlessPitchPath } from "./DurationlessPitchPath";
import {
  durationlessPitchRadius,
  maxNoteXLength,
  rootCircleXRadius,
  rootCircleYRadius,
  sharpXOffset,
  sharpYOffset,
} from "src/constants/svg";
import { NoteShapeGroup } from "src/components/svg/NoteShapeGroup";
import { isGuessable } from "src/utils/note";
import { arraysIdentical } from "src/utils/arrayCompare";
import { chosenSong } from "src/constants/chosenSong";
import { ExtraStaveLines } from "./ExtraStaveLines";
import { getBaseYPosition, getRootCircleCX, noteSharpOffset, shouldAddSharp } from "src/utils/score";

const SVGWidth = 2740;
const SVGHeight = 440;
const clefLength = 300;
const timeSignatureWidth = 80;
const incorrectPitchLength = 250;

const distanceBetweenNotes = 3 * maxNoteXLength;

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
  showSharp?: boolean;
}

const NotePath = ({
  note,
  displayIndex,
  color,
  opacity = 1,
  handleClick,
  staveIndex,
  showSharp = true,
}: NotePathProps) => {
  const baseXPosition =
    getBaseXPosition(displayIndex, staveIndex) + noteSharpOffset(note.pitch);
  const baseYPosition = getBaseYPosition(note.pitch);

  return (
    <>
      <NoteShapeGroup
        durations={note.durations}
        baseXPosition={baseXPosition}
        baseYPosition={baseYPosition}
        handleClick={handleClick}
        color={color}
        opacity={opacity}
        staccato={note.staccato}
      />
      {shouldAddSharp(note.pitch) && showSharp && (
        <SharpPath
          xStart={baseXPosition + sharpXOffset}
          yStart={getBaseYPosition(note.pitch) + sharpYOffset}
          handleClick={handleClick}
          color={color}
          strokeWidth={6}
          opacity={opacity}
        />
      )}
      <ExtraStaveLines
        pitch={note.pitch}
        startPitch="A5"
        increasing
        baseXPosition={baseXPosition}
      />
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
    (rootCircleXRadius + rootCircleYRadius) / 2 +
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
        if (incorrectDurationsArrays[trueIndex].includes(note.durations)) {
          color = INCORRECT_COLOR;
        }
        if (
          answerStatuses[trueIndex].durationStatus ===
          AnswerStatus.GUESSEDCORRECT) {
          if (arraysIdentical(
            note.durations,
            correctNotes[trueIndex].durations
          )) {
            opacity = 0.8;
            color = CORRECT_COLOR;
          } else {
            color = INCORRECT_COLOR;
          }
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
            <NoteShapeGroup
              durations={note.durations}
              baseXPosition={
                getBaseXPosition(displayIndex, staveIndex) +
                noteSharpOffset(note.pitch)
              }
              color={color}
              opacity={opacity}
              baseYPosition={getBaseYPosition("B4")}
              rest
              key={`rest-${trueIndex}-${note.pitch}-${note.durations}`}
            />
          );
        }
        return (
          <NotePath
            note={note}
            displayIndex={displayIndex}
            color={color}
            showSharp={false}
            opacity={opacity}
            key={`note-${trueIndex}-${note.pitch}-${note.durations}`}
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
  const {
    guesses,
    answerStatuses,
    setSelectedNoteIndex,
    incorrectPitchesArrays,
  } = useStore();

  return (
    <>
      {answerStatuses
        .slice(startIndex, endIndex)
        .map(({ pitchStatus, durationStatus }, displayIndex) => {
          let trueIndex = startIndex + displayIndex;
          if (!isGuessable(correctNotes[trueIndex])) {
            return <></>;
          }
          if (
            pitchStatus === AnswerStatus.GUESSEDCORRECT &&
            durationStatus === AnswerStatus.GUESSEDCORRECT
          ) {
            return (
              <g key={"non-incorrect-path-" + trueIndex}>
                <PitchGuessPath
                  pitch={correctNotes[trueIndex].pitch}
                  positionIndex={displayIndex}
                  color={CORRECT_PITCH_COLOR}
                  key={`${trueIndex}-${correctNotes[trueIndex].pitch}-non-incorrect`}
                  handleClick={() => setSelectedNoteIndex(trueIndex)}
                  staveIndex={staveIndex}
                />
                {guesses[trueIndex].pitch !== correctNotes[trueIndex].pitch && (
                  <PitchGuessPath
                    pitch={guesses[trueIndex].pitch}
                    positionIndex={displayIndex}
                    color={
                      incorrectPitchesArrays[trueIndex].includes(
                        guesses[trueIndex].pitch
                      )
                        ? INCORRECT_COLOR
                        : BASE_COLOR
                    }
                    key={`${trueIndex}-pitch-not-necessarily-correct`}
                    handleClick={() => setSelectedNoteIndex(trueIndex)}
                    staveIndex={staveIndex}
                  />
                )}
              </g>
            );
          }
          if (pitchStatus === AnswerStatus.GUESSEDCORRECT) {
            return (
              <g key={`${trueIndex}-pitch-group`}>
                <PitchGuessPath
                  pitch={correctNotes[trueIndex].pitch}
                  positionIndex={displayIndex}
                  color={CORRECT_PITCH_COLOR}
                  key={`${trueIndex}-pitch-correct`}
                  handleClick={() => setSelectedNoteIndex(trueIndex)}
                  staveIndex={staveIndex}
                />
                {guesses[trueIndex].pitch !== correctNotes[trueIndex].pitch && (
                  <PitchGuessPath
                    pitch={guesses[trueIndex].pitch}
                    positionIndex={displayIndex}
                    color={INCORRECT_COLOR}
                    key={`${trueIndex}-pitch-not-necessarily-correct`}
                    handleClick={() => setSelectedNoteIndex(trueIndex)}
                    staveIndex={staveIndex}
                  />
                )}
              </g>
            );
          }
          return (
            <PitchGuessPath
              pitch={guesses[trueIndex].pitch}
              positionIndex={displayIndex}
              color={
                incorrectPitchesArrays[trueIndex].includes(
                  guesses[trueIndex].pitch
                )
                  ? INCORRECT_COLOR
                  : BASE_COLOR
              }
              key={`${trueIndex}-pitch-not-necessarily-correct`}
              handleClick={() => setSelectedNoteIndex(trueIndex)}
              staveIndex={staveIndex}
            />
          );
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
            return <g key={`${positionIndex}-${pitch}`}></g>;
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
  const notesPerLine = 4;
  let staveIndex = 0;
  for (let i = 0; i < songLength; i = i + notesPerLine) {
    const startIndex = i;
    const endIndex = Math.min(i + notesPerLine, songLength);
    buffer.push(
      <svg
        viewBox={`0 0 ${SVGWidth} ${SVGHeight}`}
        xmlns="<http://www.w3.org/2000/svg>"
        className={svgStyles.svgScore}
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
    case TimeSignature.TWOTWO:
      return 2;
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
    case TimeSignature.THREEFOUR:
    case TimeSignature.FOURFOUR:
    case TimeSignature.FIVEFOUR:
      return 4;
    case TimeSignature.TWOTWO:
      return 2;
  }
};

const TimeSignaturePath = () => {
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
